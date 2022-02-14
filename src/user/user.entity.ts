import LocalFile from 'src/files/localFile.entity';
import { Garment } from 'src/garment/garment.entity';
import { Tag } from 'src/tag/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @OneToMany(() => Garment, (garment) => garment.user)
  public garments: Garment[];

  @OneToMany(() => Tag, (tag) => tag.user)
  public tags: Tag[];

  @JoinColumn()
  @OneToOne(() => LocalFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: LocalFile;
}

export default User;
