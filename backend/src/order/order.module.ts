import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { FilmsModule } from '../films/films.module';
import { OrderRepository } from 'src/repository/order.repository';

@Module({
  imports: [ConfigModule, FilmsModule],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  exports: [OrderRepository, OrderService],
})
export class OrderModule {}
