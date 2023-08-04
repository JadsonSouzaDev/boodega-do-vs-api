import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    let user: User;
    try {
      user = await this.usersService.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(pass, user.password);
    const { password, active, id, ...result } = user;

    return isPasswordValid ? result : null;
  }

  login(user: User) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
