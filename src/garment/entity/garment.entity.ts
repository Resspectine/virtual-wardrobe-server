import { Tag } from 'src/tag/entity/tag.entity';
import User from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: string;

  @Column({ nullable: false, name: 'image_url' })
  imageUrl: string;

  @Column({ nullable: false, name: 'wearing_amount' })
  wearingAmount: number;

  @Column({ nullable: false, name: 'is_favorite' })
  isFavorite: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Tag, (tag: Tag) => tag.garments)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.garments)
  user: User;
}
