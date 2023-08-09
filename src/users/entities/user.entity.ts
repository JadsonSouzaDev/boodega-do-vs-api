import { CreateUserRequestDto } from '../dto/request/create-user-request.dto';

export const Role: { [x: string]: 'USER' | 'ADMIN' } = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export type Role = (typeof Role)[keyof typeof Role];

export class User {
  constructor(iUser: CreateUserRequestDto) {
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
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
