import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  constructor(iUser: CreateUserDto) {
    this.name = iUser.name;
    this.email = iUser.email;
    this.phone = iUser.phone;
    this.active = true;
    this.password = iUser.password;
  }

  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  active: boolean;
}
