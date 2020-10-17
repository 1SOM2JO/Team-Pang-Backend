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

  @Column('timestamp')
  start_day: Date;

  @Column('timestamp')
  end_day: Date;

  @Column()
  like: string;

  @Column()
  description: string;

  @Column()
  img: string;

  @CreateDateColumn()
  createdAt: Date;

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
  experience_like!: Experience_report[];

  @OneToMany(
    (type) => Experience_application,
    (experience_application) => experience_application.experience,
  )
  experience_application!: Experience_application[];
}
