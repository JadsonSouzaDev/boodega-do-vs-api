import { Module } from '@nestjs/common';
import { SongRequestsService } from './song-requests.service';
import { SongRequestsController } from './song-requests.controller';

@Module({
  controllers: [SongRequestsController],
  providers: [SongRequestsService]
})
export class SongRequestsModule {}
