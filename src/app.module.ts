import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SongsModule } from './songs/songs.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
