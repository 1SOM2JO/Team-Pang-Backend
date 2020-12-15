import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from './User';
import { Product_report } from './Product_report';
import { Product_like } from './Product_like';
import { Product_purchase } from './Product_purchase';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  product_name: string;

  @Column()
  price: string;

  @Column()
  unit: string;

  @Column()
  province: string;

  @Column()
  county: string;

  @Column()
  like: string;

  @Column()
  description: string;

  @Column()
  img: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne((type) => User, (user) => user.product)
  user!: User;

  @OneToMany(
    (type) => Product_report,
    (product_report) => product_report.product,
  )
  product_report!: Product_report[];

  @OneToMany((type) => Product_like, (product_like) => product_like.product)
  product_like!: Product_like[];

  @OneToMany(
    (type) => Product_purchase,
    (product_purchase) => product_purchase.product,
  )
  product_purchase!: Product_purchase[];
}
