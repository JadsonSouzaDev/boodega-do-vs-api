import { Controller, Get } from '@nestjs/common';
import { SongVersionsService } from './song-versions.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('song-versions')
export class SongVersionsController {
  constructor(private readonly songVersionsService: SongVersionsService) {}

  @Public()
  @Get()
  findAll() {
    return this.songVersionsService.findAll();
  }
}
