import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SongsModule } from './songs/songs.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SongsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
