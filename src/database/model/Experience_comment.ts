import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Experience } from './Experience';

@Entity()
export class Experience_comment {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  name: string;

  @Column()
  star: number;

  @Column()
  comment: string;

  @ManyToOne((type) => User, (user) => user.experience_comment)
  user!: User;

  @ManyToOne((type) => Experience, (experience) => experience.experience_comment)
  experience!: Experience;
}
