import { CreateSongDto } from '../dto/create-song.dto';

export class Song {
  constructor(iSong: CreateSongDto) {
    this.name = iSong.name;
    this.style = iSong.style;
    this.tonality = iSong.tonality;
    this.duration = iSong.duration;
    this.youtubeCode = iSong.youtubeCode;
    this.active = true;
  }

  id: string;
  slug: string;
  name: string;
  style: string;
  tonality: string;
  duration: number;
  youtubeCode: string;
  active: boolean;
}
