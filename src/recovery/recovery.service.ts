import { Injectable } from '@nestjs/common';
import { RequestRecoveryDto } from './dto/request-recovery.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecoveryService {
  constructor(private readonly usersService: UsersService) {}

  requestRecovery(createRecoveryDto: RequestRecoveryDto) {
    // Get User activate
    const user = this.usersService.findByEmail(createRecoveryDto.email);

    // Generate and store code
    const code = [...Array(6)].map((_) => (Math.random() * 10) | 0).join('');

    // Send Email
    
  }

  updatePassword(code: string, updatePasswordDto: UpdatePasswordDto) {
    // Get user by code
    // Update user password
  }
}
