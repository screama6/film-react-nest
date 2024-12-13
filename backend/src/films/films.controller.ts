import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmByIdDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findById(
    @Param('id') id: string,
  ): Promise<{ total: number; items: GetFilmByIdDTO[] }> {
    return this.filmsService.findById(id);
  }
}
