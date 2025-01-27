import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { GetFilmByIdDTO, GetFilmsDTO } from './dto/films.dto';
import { ConfigService } from '@nestjs/config';
import { FilmsRepositoryPostgres } from '../repository/films.repository.postgres';
import { AppConfig } from '../app.config.provider';
import { Schedules } from './entities/shedule.entity';

@Injectable()
export class FilmsService {
  private readonly databaseDriver: string;

  constructor(
    private configService: ConfigService,
    @Inject('FILM_REPOSITORY')
    private readonly filmsRepository: FilmsRepository | FilmsRepositoryPostgres,
  ) {
    this.databaseDriver =
      this.configService.get<AppConfig['database']>('app.database')?.driver;
  }

  async findAll(): Promise<GetFilmsDTO> {
    return this.filmsRepository.findAll();
  }

  private async handleDatabaseOperation<T>(
    operation: () => Promise<T>,
    operationDescription: string,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw new InternalServerErrorException(
        `Не удалось ${operationDescription}. Ошибка: ${error.message}`,
      );
    }
  }

  async findById(
    id: string,
  ): Promise<{ total: number; items: GetFilmByIdDTO[] | Schedules[] }> {
    return this.handleDatabaseOperation(async () => {
      const result = await this.filmsRepository.findById(id);
      if (result && result.schedule) {
        return { total: result.schedule.length, items: result.schedule };
      }
      return { total: 0, items: [] };
    }, `получить фильм с ID ${id}`);
  }
}
