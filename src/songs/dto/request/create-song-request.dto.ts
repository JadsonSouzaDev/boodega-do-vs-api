import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';
import { Song } from '../../entities/song.entity';

export class URLDownloadSongDto {
  url: string;
  version: { id: string };
}

export class CreateSongRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  style: string;

  @IsNotEmpty()
  @Length(1, 3)
  tonality: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @Length(1, 50)
  youtubeCode: string;

  urlsDownload: URLDownloadSongDto[];

  @Transform(() => Song)
  toEntity(slug: string): Song {
    return {
      id: null,
      name: this.name,
      tonality: this.tonality,
      style: this.style,
      duration: this.duration,
      youtubeCode: this.youtubeCode,
      slug: slug,
      active: true,
      createdAt: null,
      updatedAt: null,
      urlsDownload: this.urlsDownload.map((urlDownload) => {
        return {
          id: null,
          url: urlDownload.url,
          version: {
            id: urlDownload.version.id,
            label: null,
            key: null,
            price: null,
          },
        };
      }),
    };
  }
}
