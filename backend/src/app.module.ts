import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}),PrismaModule,ProductsModule, CartModule, OrdersModule,CategoriesModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}