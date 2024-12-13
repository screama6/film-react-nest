import { Body, Controller, Post } from '@nestjs/common';
import { PostOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('')
  async create(@Body() body: any): Promise<PostOrderDto> {
    return this.orderService.create(body.tickets);
  }
}
