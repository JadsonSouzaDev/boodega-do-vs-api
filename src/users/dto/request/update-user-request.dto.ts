import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Role, User } from 'src/users/entities/user.entity';

export class UpdateUserRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(11, 11)
  phone: string;

  @Transform(() => User)
  toEntity(userSaved: User): User {
    return {
      id: userSaved.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      active: true,
      password: userSaved.password,
      role: Role.USER,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    };
  }
}
