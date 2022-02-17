import { IsNotEmpty, IsString } from 'class-validator';

export class TagDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
