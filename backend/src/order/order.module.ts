import { DynamicModule, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { FilmsModule } from '../films/films.module';
import { OrderRepository } from 'src/repository/order.repository';

@Module({})
export class OrderModule {
  static forRootAsync(): DynamicModule {
    return {
      module: OrderModule,
      imports: [ConfigModule, FilmsModule.forDatabase()],
      controllers: [OrderController],
      providers: [OrderRepository, OrderService],
    };
  }
}
