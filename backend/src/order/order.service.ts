import { Injectable } from '@nestjs/common';
import { IBodyDTO, PostOrderDto } from './dto/order.dto';
import { OrderRepository } from 'src/repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async create(body: IBodyDTO): Promise<PostOrderDto> {
    return this.orderRepository.create(body);
  }
}
