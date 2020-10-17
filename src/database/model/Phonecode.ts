import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Phonecode {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  phonenumber: string;

  @Column()
  code: string;
}
