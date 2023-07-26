import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  style: string;

  @IsNotEmpty()
  @Length(1, 2)
  tonality: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsNotEmpty()
  @Length(1, 50)
  youtubeCode: string;
}
