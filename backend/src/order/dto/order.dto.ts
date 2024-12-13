export class PostOrderDto {
  total: number;
  items: IBody[];
}

export interface IBody {
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
  id: string;
}
