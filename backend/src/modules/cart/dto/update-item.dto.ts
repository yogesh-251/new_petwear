// src/cart/dto/update-item.dto.ts
import { IsInt, Min } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
