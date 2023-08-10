import { ArrayNotEmpty, IsInt, IsNotEmpty, Length, Min } from 'class-validator';
import { URLDownloadSongDto } from './create-song-request.dto';
import { Transform } from 'class-transformer';
import { Song } from 'src/songs/entities/song.entity';

export class UpdateRequestSongDto {
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

  @ArrayNotEmpty()
  urlsDownload: URLDownloadSongDto[];

  @Transform(() => Song)
  toEntity(songSaved: Song): Song {
    return {
      id: songSaved.id,
      name: this.name,
      tonality: this.tonality,
      style: this.style,
      duration: this.duration,
      youtubeCode: this.youtubeCode,
      slug: songSaved.slug,
      active: true,
      createdAt: songSaved.createdAt,
      updatedAt: songSaved.updatedAt,
      urlsDownload: this.urlsDownload.map((urlDownload) => {
        return {
          id: urlDownload.id,
          url: urlDownload.url,
          songVersionId: urlDownload.version.id,
          version: undefined,
        };
      }),
    };
  }
}
