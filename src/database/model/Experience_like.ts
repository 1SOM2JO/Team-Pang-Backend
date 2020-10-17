import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Experience } from './Experience';

@Entity()
export class Experience_like {
  @PrimaryGeneratedColumn()
  uuid: number;

  @ManyToOne((type) => User, (user) => user.experience_like)
  user!: User;

  @ManyToOne((type) => Experience, (experience) => experience.experience_like)
  experience!: Experience;
}
