import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrder: CreateOrderDTO = {
    email: 'test@test.ru',
    phone: '71234567890',
    tickets: [
      {
        film: 'f3b8518c-87ee-4519-88c0-a89fdb10edcb',
        session: 'c40a4804-5347-427f-9f68-f9b2670d5ddf',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 8,
        seat: 8,
        price: 350,
      },
    ],

    get getOrderData() {
      return this.tickets.map((ticket) => ({
        filmId: ticket.film,
        sessionId: ticket.session,
        seatsSelection: `${ticket.row}:${ticket.seat}`,
      }));
    },
  };

  const mockOrderResponse = { ...mockOrder };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        create: jest.fn().mockResolvedValue(mockOrderResponse),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('createOrder() should call the placeOrder service method and return the created order', async () => {
    const result = await controller.create(mockOrder);

    expect(result).toEqual(mockOrderResponse);

    expect(service.create).toHaveBeenCalledWith(mockOrder);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('.createOrder() should handle service errors gracefully', async () => {
    const errorMessage = 'Service error';
    (service.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(controller.create(mockOrder)).rejects.toThrow(errorMessage);

    expect(service.create).toHaveBeenCalledWith(mockOrder);
    expect(service.create).toHaveBeenCalledTimes(1);
  });
});
