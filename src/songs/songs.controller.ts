import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongRequestDto } from './dto/request/create-song-request.dto';
import { UpdateRequestSongDto } from './dto/request/update-song-request.dto';
import { Public } from 'src/decorators/public.decorator';
import axios from 'axios';
import { Admin } from 'src/decorators/admin.decorator';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  
  @Admin()
  @Post()
  create(@Body() createSongDto: CreateSongRequestDto) {
    return this.songsService.create(createSongDto);
  }

  @Public()
  @Get('')
  findAll(@Query() query: { name: string }) {
    return this.songsService.findAll(query.name);
  }

  @Get('my-songs')
  mySongs(@Query() query: { name: string }) {
    return this.songsService.mySongs(query.name);
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.songsService.findBySlug(slug);
  }

  @Admin()
  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.songsService.findById(id);
  }

  @Get(':id/download')
  async downloadSong(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const downloadURL = await this.songsService.getLinkDownload(id);
    const instance = axios.create({ baseURL: downloadURL });
    let response = await instance.get('', {
      responseType: 'stream',
    });
    response.data.pipe(res);
  }

  @Admin()
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSongDto: UpdateRequestSongDto,
  ) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.songsService.remove(id);
  }
}
