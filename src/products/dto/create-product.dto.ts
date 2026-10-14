import {
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  stock: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  categoryId: number;
}
