import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedules } from './shedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  id: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  schedule: Schedules[];
}
