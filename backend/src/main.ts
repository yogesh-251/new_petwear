import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001
  console.log(`🚀 Starting NestJS on port: ${port}`)
  await app.listen(port)
  app.useGlobalGuards(new JwtAuthGuard());
}
bootstrap();

