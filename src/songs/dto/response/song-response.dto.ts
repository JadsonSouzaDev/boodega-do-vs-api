import { Song } from 'src/songs/entities/song.entity';

export class SongResponseDto {
  constructor(song: Song) {
    this.slug = song.slug;
    this.name = song.name;
    this.style = song.style;
    this.tonality = song.tonality;
    this.duration = song.duration;
    this.youtubeCode = song.youtubeCode;
  }

  slug: string;
  name: string;
  style: string;
  tonality: string;
  duration: number;
  youtubeCode: string;
}
