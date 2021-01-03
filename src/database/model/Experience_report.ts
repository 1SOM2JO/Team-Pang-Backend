import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Experience } from './Experience';

@Entity()
export class Experience_report {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne((type) => User, (user) => user.experience_report)
  user!: User;

  @ManyToOne((type) => Experience, (experience) => experience.experience_report)
  experience!: Experience;
}
