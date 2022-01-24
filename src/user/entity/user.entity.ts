import { Garment } from 'src/garment/entity/garment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @OneToMany(() => Garment, (garment) => garment.user)
  public garments: Garment[];
}

export default User;
