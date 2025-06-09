import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateOrCreateUser(supabaseId: string, email: string, name?: string) {
    let user = await this.prisma.user.findUnique({ where: { id: supabaseId } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: supabaseId,
          email,
          name,
        },
      });
    }

    return user;
  }
}
