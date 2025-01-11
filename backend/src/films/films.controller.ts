import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsByIdDTO, GetFilmsDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<GetFilmsDTO> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findById(@Param('id') id: string): Promise<GetFilmsByIdDTO> {
    return this.filmsService.findById(id);
  }
}
