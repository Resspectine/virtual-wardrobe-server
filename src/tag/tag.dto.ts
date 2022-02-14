import { IsDate, IsString } from 'class-validator';

export class TagDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
