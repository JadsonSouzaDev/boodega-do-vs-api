import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  
  await app.listen(3001);
  app.enableShutdownHooks();
}
bootstrap();
