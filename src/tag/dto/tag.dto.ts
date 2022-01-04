import { IsDate, IsNumber, IsString } from 'class-validator';

export class TagDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
