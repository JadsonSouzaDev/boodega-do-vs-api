import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { Role, User } from 'src/users/entities/user.entity';

export class CreateUserRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(11, 11)
  phone: string;

  @Transform(() => User)
  toEntity(): User {
    return {
      id: null,
      name: this.name,
      email: this.email,
      phone: this.phone,
      active: true,
      password: this.password,
      role: Role.USER,
      createdAt: null,
      updatedAt: null,
    };
  }
}
