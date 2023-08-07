import { Module } from '@nestjs/common';
import { SongRequestsService } from './song-requests.service';
import { SongRequestsController } from './song-requests.controller';
import { PrismaService } from 'src/database/prisma.service';
import { SongRequestsRepository } from 'src/repositories/songRequest.repository';
import { PrismaSongRequestsRepository } from './prisma-songRequests.repository';

@Module({
  controllers: [SongRequestsController],
  providers: [
    SongRequestsService,
    PrismaService,
    { provide: SongRequestsRepository, useClass: PrismaSongRequestsRepository },
  ],
})
export class SongRequestsModule {}
