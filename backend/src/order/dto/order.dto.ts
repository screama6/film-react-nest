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

export interface IBodyDTO {
  email: string;
  phone: string;
  tickets: IOrder[];
}
