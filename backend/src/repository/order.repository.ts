import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { IBodyTicketsDTO, IOrder, PostOrderDto } from 'src/order/dto/order.dto';
import { FilmsRepository } from './films.repository';
import { GetFilmDTO } from 'src/films/dto/films.dto';

@Injectable()
export class OrderRepository {
  constructor(private readonly filmsRepository: FilmsRepository) {}

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
    tickets: IBodyTicketsDTO[],
    films: GetFilmDTO[],
  ): Promise<void> {
    for (const ticket of tickets) {
      const film = films.find((f) => f.id === ticket.film);
      if (!film) continue;

      film.schedule.forEach((s) => {
        if (s.id === ticket.session) {
          if (
            s.taken.find(
              (element) => element === `${ticket.row}:${ticket.seat}`,
            ) === undefined
          ) {
            s.taken.push(`${ticket.row}:${ticket.seat}`);
          }
        }
      });
      await this.filmsRepository.updateFilmScheduleById(
        ticket.film,
        film.schedule,
      );
    }
  }

  async create(body: IOrder[], films: GetFilmDTO[]): Promise<PostOrderDto> {
    try {
      await this.orderTake(body, films);
      return {
        total: body.length,
        items: body.map(this.getBodyTicketsMapperFn()),
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
