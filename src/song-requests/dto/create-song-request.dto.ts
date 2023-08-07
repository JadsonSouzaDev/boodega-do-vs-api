import { IsNotEmpty } from 'class-validator';

export class CreateSongRequestDto {
  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  details: string;
}
