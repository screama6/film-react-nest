import { Injectable } from '@nestjs/common';
import { IOrder, PostOrderDto } from './dto/order.dto';
import { OrderRepository } from 'src/repository/order.repository';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}
  async create(body: IOrder[]): Promise<PostOrderDto> {
    const films = await this.filmsRepository.findAll();
    return this.orderRepository.create(body, films.items);
  }
}
