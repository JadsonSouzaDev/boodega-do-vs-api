import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestRecoveryDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
