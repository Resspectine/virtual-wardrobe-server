import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class LocalFile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public filename: string;

  @Column()
  public path: string;

  @Column()
  public mimetype: string;
}

export default LocalFile;
