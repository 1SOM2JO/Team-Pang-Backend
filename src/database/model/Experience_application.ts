import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Experience } from './Experience';

@Entity()
export class Experience_application {
  @PrimaryGeneratedColumn()
  uuid: number;

  @ManyToOne((type) => User, (user) => user.experience_application)
  user!: User;

  @ManyToOne(
    (type) => Experience,
    (experience) => experience.experience_application,
  )
  experience!: Experience;
}
