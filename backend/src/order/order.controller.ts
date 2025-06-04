import { Body, Controller, Post } from '@nestjs/common';
import { IBodyDTO, PostOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('')
  async create(@Body() body: IBodyDTO): Promise<PostOrderDto> {
    return this.orderService.create(body);
  }
}
