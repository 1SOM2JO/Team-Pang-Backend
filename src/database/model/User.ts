import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Product } from './Product';
import { Product_report } from './Product_report';
import { Product_like } from './Product_like';
import { Experience } from './Experience';
import { Experience_report } from './Experience_report';
import { Experience_like } from './Experience_like';
import { Product_purchase } from './Product_purchase';
import { Experience_application } from './Experience_application';

export enum Permission {
  SELLER = 'SELLER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column('enum', { enum: Permission })
  permission: string;

  @Column({ unique: true })
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phonenumber: string;

  @Column()
  accessTokenKey: string;

  @Column()
  refreshTokenKey: string;

  @Column()
  user_img: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany((type) => Product, (product) => product.user)
  product!: Product[];

  @OneToMany((type) => Product_report, (product_report) => product_report.user)
  product_report!: Product_report[];

  @OneToMany((type) => Product_like, (product_like) => product_like.user)
  product_like!: Product_like[];

  @OneToMany(
    (type) => Product_purchase,
    (product_purchase) => product_purchase.product,
  )
  product_purchase!: Product_purchase[];

  @OneToMany((type) => Experience, (experience) => experience.user)
  experience!: Experience[];

  @OneToMany(
    (type) => Experience_report,
    (experience_report) => experience_report.user,
  )
  experience_report!: Experience_report[];

  @OneToMany(
    (type) => Experience_like,
    (experience_like) => experience_like.user,
  )
  experience_like!: Experience_like[];

  @OneToMany(
    (type) => Experience_application,
    (experience_application) => experience_application.user,
  )
  experience_application!: Experience_application[];
}
