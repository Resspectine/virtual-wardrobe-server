import { Garment } from 'src/garment/entity/garment.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @ManyToMany(() => Garment, (garment: Garment) => garment.tags)
  garments: Garment[];
}
