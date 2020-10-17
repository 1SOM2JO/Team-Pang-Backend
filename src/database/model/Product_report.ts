import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { User } from './User';
import { Product } from './Product';

@Entity()
export class Product_report {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne((type) => Product, (product) => product.product_report)
  product!: Product;

  @ManyToOne((type) => User, (user) => user.product_report)
  user!: User;
}
