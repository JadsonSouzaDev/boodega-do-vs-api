import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User(createUserDto);
    return this.repository.create(user);
  }

  findAll(name: string, email: string, phone: string): Promise<User[]> {
    return this.repository.findAll(name, email, phone);
  }

  findById(id: string): Promise<User> {
    try {
      return this.repository.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  findByEmail(email: string): Promise<User> {
    try {
      return this.repository.findByEmail(email);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    const updatedUser: User = {
      id,
      name: updateUserDto.name,
      phone: updateUserDto.phone,
      active: true,
      email: user.email,
      password: user.password,
    };
    return this.repository.update(id, updatedUser);
  }

  async updatePassword(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    const encryptedPassword = hashSync(password, genSaltSync(10));
    const updatedUser: User = {
      ...user,
      password: encryptedPassword,
    };
    return this.repository.update(updatedUser.id, updatedUser);
  }

  remove(id: string): Promise<User> {
    return this.repository.delete(id);
  }
}
