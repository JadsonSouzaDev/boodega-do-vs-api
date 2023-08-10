import { Song } from 'src/songs/entities/song.entity';

export class SongResponseDto {
  constructor(song: Song) {
    this.id = song.id;
    this.slug = song.slug;
    this.name = song.name;
    this.style = song.style;
    this.tonality = song.tonality;
    this.duration = song.duration;
    this.youtubeCode = song.youtubeCode;
  }

  id: string;
  slug: string;
  name: string;
  style: string;
  tonality: string;
  duration: number;
  youtubeCode: string;
}
