import { Injectable } from '@nestjs/common';
import { IBody, PostOrderDto } from 'src/order/dto/order.dto';
import { FilmsRepository } from './films.repository';
import { GetFilmDTO } from 'src/films/dto/films.dto';

@Injectable()
export class OrderRepository {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  private async orderTake(
    tickets: IBody[],
    films: GetFilmDTO[],
  ): Promise<void> {
    for (const ticket of tickets) {
      const film = films.find((f) => f.id === ticket.film);
      if (!film) continue;

      film.schedule.forEach((s) => {
        if (s.id === ticket.session) {
          s.taken.push(`${ticket.row}:${ticket.seat}`);
        }
      });
      await this.filmsRepository.updateFilmScheduleById(
        ticket.film,
        film.schedule,
      );
    }
  }

  async create(body: IBody[], films: GetFilmDTO[]): Promise<PostOrderDto> {
    this.orderTake(body, films);
    return {
      total: body.length,
      items: body,
    };
  }
}
