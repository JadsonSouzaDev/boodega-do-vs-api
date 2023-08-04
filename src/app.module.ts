import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SongsModule } from './songs/songs.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecoveryModule } from './recovery/recovery.module';

@Module({
  imports: [SongsModule, AuthModule, UsersModule, RecoveryModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
