import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetFilmByIdDTO,
  GetFilmDTO,
  GetFilmsDTO,
} from '../films/dto/films.dto';
import { Film } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  private getFilmMapperFn(): (Film) => GetFilmDTO {
    return (root) => {
      return {
        id: root._id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async findAll(): Promise<GetFilmsDTO> {
    const [films, total] = await Promise.all([
      this.filmModel.find({}),
      this.filmModel.countDocuments({}),
    ]);
    return {
      total,
      items: films,
    };
  }

  async findById(id: string): Promise<GetFilmDTO> {
    return await this.filmModel.findOne({ id: id });
  }

  async updateFilmScheduleById(
    id: string,
    schedule: GetFilmByIdDTO[],
  ): Promise<{ acknowledged: boolean; modifiedCount: number }> {
    const result = await this.filmModel.updateOne(
      { id: id },
      { $set: { schedule: schedule } },
    );

    if (result.modifiedCount === 0) {
      throw new NotFoundException(id);
    }

    return result;
  }
}
