import { Injectable } from '@nestjs/common';
import { RequestRecoveryDto } from './dto/request-recovery.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from 'src/users/users.service';
import { MailingService } from 'src/mailing/mailing.service';
import { RecoveryRepository } from 'src/repositories/recovery.repository';
import { Recovery } from './entities/recovery.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RecoveryService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailingService: MailingService,
    private readonly recoveryRepository: RecoveryRepository,
  ) {}

  async requestRecovery(createRecoveryDto: RequestRecoveryDto) {
    const user = await this.usersService.findByEmail(createRecoveryDto.email);
    let oldRecovery: Recovery;

    try {
      oldRecovery = await this.recoveryRepository.findByEmail(
        createRecoveryDto.email,
      );
    } catch (error) {}

    const recovery = oldRecovery
      ? await this.updateRecovery(oldRecovery)
      : await this.createRecovery(user);

    this.mailingService.sendRecoveryEmail(recovery);
    return recovery;
  }

  async updatePassword(code: string, updatePasswordDto: UpdatePasswordDto) {
    const recovery = await this.recoveryRepository.findByCode(code);
    await this.usersService.updatePassword(recovery.email, updatePasswordDto.password);
  }

  private createRecovery = async (user: User) => {
    const code = [...Array(6)].map((_) => (Math.random() * 10) | 0).join('');
    const recovery = new Recovery(code, user.email);
    return await this.recoveryRepository.create(recovery);
  };

  private updateRecovery = async (recovery: Recovery) => {
    return await this.recoveryRepository.update(recovery.id, recovery);
  };
}
