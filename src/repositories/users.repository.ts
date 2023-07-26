import { User } from 'src/users/entities/user.entity';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findAll(name: string, email: string, phone: string): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract update(id: string, user: User): Promise<User>;
  abstract delete(id: string): Promise<User>;
}
