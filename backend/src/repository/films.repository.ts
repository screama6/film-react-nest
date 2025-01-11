import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetFilmByIdDTO,
  GetFilmDTO,
  GetFilmsDTO,
} from 'src/films/dto/films.dto';
import { Film } from 'src/films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

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

  private getScheduleMapperFn(): (Film) => GetFilmByIdDTO {
    return (root) => {
      return {
        id: root.id,
        daytime: root.daytime,
        hall: root.hall,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
        taken: root.taken,
      };
    };
  }

  async findAll(): Promise<GetFilmsDTO> {
    const items = await this.filmModel.find({}); //используем обычные методы Mongoose-документов
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async findById(
    id: string,
  ): Promise<{ total: number; items: GetFilmByIdDTO[] }> {
    const items = await this.filmModel.findById(id); //используем обычные методы Mongoose-документов
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: items.schedule.map(this.getScheduleMapperFn()),
    };
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
