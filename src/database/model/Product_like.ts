import { CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './User';
import { Product } from './Product';

@Entity()
export class Product_like {
  @PrimaryGeneratedColumn()
  uuid: number;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne((type) => User, (user) => user.product_like)
  user!: User;

  @ManyToOne((type) => Product, (product) => product.product_like)
  product!: Product;
}
