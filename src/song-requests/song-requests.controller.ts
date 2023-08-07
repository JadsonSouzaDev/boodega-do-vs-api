import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SongRequestsService } from './song-requests.service';
import { CreateSongRequestDto } from './dto/create-song-request.dto';
import { UpdateSongRequestDto } from './dto/update-song-request.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('song-requests')
export class SongRequestsController {
  constructor(private readonly songRequestsService: SongRequestsService) {}

  @Post()
  create(
    @Req() request: { user: User },
    @Body() createSongRequestDto: CreateSongRequestDto,
  ) {
    return this.songRequestsService.create(createSongRequestDto, request.user);
  }

  @Get()
  findAll() {
    return this.songRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songRequestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSongRequestDto: UpdateSongRequestDto,
  ) {
    return this.songRequestsService.update(id, updateSongRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songRequestsService.remove(id);
  }
}
