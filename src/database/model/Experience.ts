import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Experience_report } from './Experience_report';
import { Experience_like } from './Experience_like';
import { Experience_application } from './Experience_application';
import { Experience_comment } from './Experience_comment';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  experience_name: string;

  @Column()
  price: string;

  @Column()
  province: string;

  @Column()
  county: string;

  @Column()
  start_day: string;

  @Column()
  end_day: string;

  @Column()
  like: number;

  @Column()
  description: string;

  @Column()
  img: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne((type) => User, (user) => user.experience)
  user!: User;

  @OneToMany(
    (type) => Experience_report,
    (experience_report) => experience_report.experience,
  )
  experience_report!: Experience_report[];

  @OneToMany(
    (type) => Experience_like,
    (experience_like) => experience_like.experience,
  )
  experience_like!: Experience_like[];

  @OneToMany(
    (type) => Experience_comment,
    (experience_comment) => experience_comment.experience,
  )
  experience_comment!: Experience_comment[];

  @OneToMany(
    (type) => Experience_application,
    (experience_application) => experience_application.experience,
  )
  experience_application!: Experience_application[];
}
