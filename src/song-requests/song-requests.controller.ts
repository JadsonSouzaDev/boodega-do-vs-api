import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SongRequestsService } from './song-requests.service';
import { CreateSongRequestDto } from './dto/create-song-request.dto';
import { UpdateSongRequestDto } from './dto/update-song-request.dto';

@Controller('song-requests')
export class SongRequestsController {
  constructor(private readonly songRequestsService: SongRequestsService) {}

  @Post()
  create(@Body() createSongRequestDto: CreateSongRequestDto) {
    return this.songRequestsService.create(createSongRequestDto);
  }

  @Get()
  findAll() {
    return this.songRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongRequestDto: UpdateSongRequestDto) {
    return this.songRequestsService.update(+id, updateSongRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songRequestsService.remove(+id);
  }
}
