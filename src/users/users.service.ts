import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';
import { UserResponseDto } from './dto/response/user-response';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
    const user = createUserDto.toEntity();
    const userSaved = await this.repository.create(user);
    return new UserResponseDto(userSaved);
  }

  async findAll(
    name: string,
    email: string,
    phone: string,
  ): Promise<UserResponseDto[]> {
    const users = await this.repository.findAll(name, email, phone);
    return users.map((user) => new UserResponseDto(user));
  }

  async findById(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.repository.findById(id);
      return new UserResponseDto(user);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    try {
      const user = await this.repository.findByEmail(email);
      return new UserResponseDto(user);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByEmailAdmin(email: string): Promise<User> {
    try {
      return this.repository.findByEmail(email);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    try {
      const oldUser = await this.repository.findById(id);
      const mergedUser = updateUserDto.toEntity(oldUser);
      const userSaved = await this.repository.update(id, mergedUser);
      return new UserResponseDto(userSaved);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updatePassword(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    try {
      const oldUser = await this.repository.findByEmail(email);
      const encryptedPassword = hashSync(password, genSaltSync(10));
      const updatedUser = {
        ...oldUser,
        password: encryptedPassword,
      };
      const userSaved = await this.repository.update(
        updatedUser.id,
        updatedUser,
      );
      return new UserResponseDto(userSaved);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  remove(id: string): Promise<User> {
    return this.repository.delete(id);
  }
}
