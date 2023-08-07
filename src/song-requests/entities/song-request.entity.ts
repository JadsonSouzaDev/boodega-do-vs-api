import { CreateSongRequestDto } from '../dto/create-song-request.dto';

export class SongRequest {
  constructor(createSongRequest: CreateSongRequestDto) {
    this.link = createSongRequest.link;
    this.details = createSongRequest.details;
  }
  
  id: string;
  link: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
