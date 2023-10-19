import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class StoreProduct {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  price: string;
  image: string;
  @IsNotEmpty()
  categories: number[];
  @IsNotEmpty()
  descriptionCorta: string;
  @IsNotEmpty()
  height: number;
  @IsNotEmpty()
  weight: number;
  @IsNotEmpty()
  size: number;
  productsRelationated: number[];
}
