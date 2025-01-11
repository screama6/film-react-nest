import { faker } from '@faker-js/faker';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateOrderDTO,
  IBodyDTO,
  IOrder,
  PostOrderDto,
} from 'src/order/dto/order.dto';
import { FilmsRepository } from './films.repository';
import { GetFilmDTO } from 'src/films/dto/films.dto';
import { ConfigService } from '@nestjs/config';
import { FilmsRepositoryPostgres } from './films.repository.postgres';
import { AppConfig } from 'src/app.config.provider';
import { Schedules } from 'src/films/entities/shedule.entity';

@Injectable()
export class OrderRepository {
  private readonly databaseDriver: string;
  constructor(
    private configService: ConfigService,
    @Inject('FILM_REPOSITORY')
    private readonly filmsRepository: FilmsRepository | FilmsRepositoryPostgres,
  ) {
    this.databaseDriver =
      this.configService.get<AppConfig['database']>('app.database')?.driver;
  }

  private getBodyTicketsMapperFn(): (body) => IOrder {
    return (root) => {
      return {
        film: root.film,
        session: root.session,
        daytime: root.daytime,
        row: root.row,
        seat: root.seat,
        price: root.price,
        id: faker.string.uuid(),
      };
    };
  }

  private async orderTake(
    tickets: CreateOrderDTO['tickets'],
    films: GetFilmDTO[],
    orderData?: CreateOrderDTO,
  ): Promise<void> {
    for (const ticket of tickets) {
      const film = films.find((f) => f.id === ticket.film);
      if (!film) {
        throw new NotFoundException(`Не найден фильм с ID ${ticket.film}`);
      }
      const schedule = film.schedule.find((s) => s.daytime === ticket.daytime);

      if (schedule) {
        let takenSeats: string[] = [];

        if (typeof schedule.taken === 'string') {
          takenSeats = schedule.taken.split(',');
        } else if (Array.isArray(schedule.taken)) {
          takenSeats = schedule.taken;
        }

        if (this.databaseDriver === 'postgres') {
          const newSeats = orderData
            ? orderData.getOrderData.flatMap((order) => order.seatsSelection)
            : [];

          const sanitizedTakenSeats = takenSeats.filter(
            (seat) => seat.trim() !== '',
          );

          const updatedTakenSeats = Array.from(
            new Set([...sanitizedTakenSeats, ...newSeats]),
          );

          schedule.taken = updatedTakenSeats.join(',');
        } else if (this.databaseDriver === 'mongodb') {
          tickets.forEach((t) => {
            takenSeats.push(`${t.row}:${t.seat}`);
          });

          schedule.taken = takenSeats;
        }

        await this.filmsRepository.updateFilmScheduleById(
          ticket.film,
          film.schedule as Schedules[],
        );
      }
    }
  }

  private generateTicketsWithId(tickets: IOrder[]): IOrder[] {
    return tickets.map((ticket) => ({
      ...ticket,
      id: faker.string.uuid(),
    }));
  }

  async create(body: IBodyDTO): Promise<PostOrderDto> {
    const films = await this.filmsRepository.findAll();
    const ticketsWithId = this.generateTicketsWithId(body.tickets);
    const order = new CreateOrderDTO();
    order.id = faker.string.uuid();
    order.email = order.email;
    order.phone = order.phone;
    order.tickets = ticketsWithId;
    try {
      await this.orderTake(body.tickets, films.items, order);
      return {
        total: order.tickets.length,
        items: order.tickets,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
