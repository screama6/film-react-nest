export class PostOrderDto {
  total: number;
  items: IOrder[];
}

export interface IBodyTicketsDTO {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id?: string;
}

export interface IOrder {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id?: string;
}

export interface IContact {
  email: string;
  phone: string;
}

export interface IBodyDTO {
  email: string;
  phone: string;
  tickets: IOrder[];
}

export class PlaceTicketDTO {
  filmId: string;
  sessionId: string;
  seatsSelection: string;
}

export class CreateOrderDTO {
  id?: string;
  email: string;
  phone: string;
  tickets!: IOrder[];

  get getOrderData(): PlaceTicketDTO[] {
    return this.tickets.map((ticket) => ({
      filmId: ticket.film,
      sessionId: ticket.session,
      seatsSelection: `${ticket.row}:${ticket.seat}`,
    }));
  }
}
