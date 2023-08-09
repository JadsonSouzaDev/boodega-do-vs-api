import { SongVersion } from 'src/song-versions/entities/song-version.entity';
import { CreateSongDto } from '../dto/create-song.dto';

export class URLDownloadSong {
  id: string
  url: string;
  version: SongVersion
}

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

export type SongWithUrls = {
  urlsDownload: URLDownloadSong[];
} & Song
