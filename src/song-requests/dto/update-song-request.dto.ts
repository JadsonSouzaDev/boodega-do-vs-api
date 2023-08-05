import { PartialType } from '@nestjs/mapped-types';
import { CreateSongRequestDto } from './create-song-request.dto';

export class UpdateSongRequestDto extends PartialType(CreateSongRequestDto) {}
