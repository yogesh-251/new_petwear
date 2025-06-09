// src/orders/orders.controller.ts
import {
  Controller, Get, Post, Param, UseGuards, Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('admin')
  @Roles('ADMIN')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('admin/:id')
  @Roles('ADMIN')
  getAnyOrderById(@Param('id') id: string) {
    return this.ordersService.getAnyOrderById(id);
  }

  @Get()
  getUserOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.userId);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string, @Request() req) {
    return this.ordersService.getOrderById(id, req.user.userId);
  }

  @Post()
  createOrder(@Request() req) {
    return this.ordersService.createOrder(req.user.userId);
  }
}

