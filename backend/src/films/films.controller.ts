import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmByIdDTO, GetFilmsDTO } from './dto/films.dto';
import { Schedules } from './entities/shedule.entity';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): Promise<GetFilmsDTO> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findById(
    @Param('id') id: string,
  ): Promise<{ total: number; items: GetFilmByIdDTO[] | Schedules[] }> {
    return this.filmsService.findById(id);
  }
}
