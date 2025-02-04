import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schemas/film.schema';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entities/film.entity';
import { FilmsRepositoryPostgres } from 'src/repository/films.repository.postgres';

@Module({})
export class FilmsModule {
  static forDatabase(): DynamicModule {
    const isMongo = process.env.DB_DRIVER === 'mongodb';

    return {
      module: FilmsModule,
      imports: isMongo
        ? [MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])]
        : [TypeOrmModule.forFeature([Films])],
      controllers: [FilmsController],
      providers: [
        FilmsService,
        isMongo
          ? { provide: 'FILM_REPOSITORY', useClass: FilmsRepository }
          : { provide: 'FILM_REPOSITORY', useClass: FilmsRepositoryPostgres },
      ],
      exports: ['FILM_REPOSITORY'],
    };
  }
}
