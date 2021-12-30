import { IsNumber, IsString } from 'class-validator';

export class TagDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}
