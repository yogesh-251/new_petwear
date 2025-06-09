// src/cart/dto/add-item.dto.ts
import { IsString, IsUUID, IsInt, Min } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
