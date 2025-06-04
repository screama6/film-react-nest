import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Films } from './film.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  daytime: string;

  @Column({ type: 'int' })
  filmId: string;

  @Column({ type: 'int' })
  hall: number;

  @Column({ type: 'int' })
  rows: number;

  @Column({ type: 'int' })
  seats: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', nullable: true })
  taken: string | string[];

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
