import LocalFile from 'src/files/localFile.entity';
import { Tag } from 'src/tag/tag.entity';
import User from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Garment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public description: string;

  @Column({ nullable: false })
  public price: string;

  @Column({ nullable: false, name: 'wearing_amount' })
  public wearingAmount: number;

  @Column({ nullable: false, name: 'is_favorite' })
  public isFavorite: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToMany(() => Tag, (tag: Tag) => tag.garments)
  @JoinTable()
  public tags: Tag[];

  @ManyToOne(() => User, (user) => user.garments)
  public user: User;

  @JoinColumn()
  @OneToOne(() => LocalFile, {
    eager: true,
    nullable: true,
  })
  public picture?: LocalFile;
}
