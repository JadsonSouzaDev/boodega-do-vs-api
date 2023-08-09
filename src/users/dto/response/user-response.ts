import { User } from 'src/users/entities/user.entity';

export class UserResponseDto {
  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
  }

  readonly name: string;
  readonly email: string;
  readonly phone: string;
}
