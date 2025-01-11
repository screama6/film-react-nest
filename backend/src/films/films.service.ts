import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { GetFilmsDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<GetFilmsDTO> {
    return this.filmsRepository.findAll();
  }

  async findById(id: string) {
    return this.filmsRepository.findById(id);
  }
}
