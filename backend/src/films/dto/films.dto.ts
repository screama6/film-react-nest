export class GetFilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetFilmByIdDTO[];
}

export class GetFilmByIdDTO {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetFilmsDTO {
  items: GetFilmDTO[];
  total: number;
}

export class GetFilmsByIdDTO {
  items: GetFilmByIdDTO[];
  total: number;
}
