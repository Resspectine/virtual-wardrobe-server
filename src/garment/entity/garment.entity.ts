import { Tag } from 'src/tag/entity/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
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

  @ManyToMany(() => Tag, (tag: Tag) => tag.garments)
  @JoinTable()
  tags: Tag[];
}
