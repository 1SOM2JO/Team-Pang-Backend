import { 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  Column 
} from 'typeorm';

import { User } from './User';
import { Product } from './Product';

@Entity()
export class Product_purchase {
  @PrimaryGeneratedColumn()
  uuid: number;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne((type) => Product, (product) => product.product_purchase)
  product!: Product;

  @ManyToOne((type) => User, (user) => user.product_purchase)
  user!: User;
}
