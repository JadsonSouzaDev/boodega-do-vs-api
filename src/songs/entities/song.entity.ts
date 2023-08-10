import { SongVersion } from 'src/song-versions/entities/song-version.entity';
import { CreateSongRequestDto } from '../dto/request/create-song-request.dto';

export class URLDownloadSong {
  id: string;
  url: string;
  songVersionId: string;
  version: SongVersion;
}

export class Song {
  constructor(iSong: CreateSongRequestDto) {
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
  urlsDownload: URLDownloadSong[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
