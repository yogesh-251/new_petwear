// src/user/user.controller.ts
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserService } from './user.service';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@Req() req: Request) {
    const user = req.user as any;
    return this.userService.getMe(user.userId);
  }

  @Roles(Role.ADMIN)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch('me')
  updateMe(@Req() req: Request, @Body() body: { name?: string }) {
    const user = req.user as any;
    return this.userService.updateUser(user.userId, body);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateUserByAdmin(@Param('id') id: string, @Body() body: { name?: string; role?: Role }) {
    return this.userService.updateUser(id, body);
  }
}
