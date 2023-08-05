import { Module } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { RecoveryController } from './recovery.controller';
import { UsersModule } from 'src/users/users.module';
import { MailingModule } from 'src/mailing/mailing.module';
import { PrismaService } from 'src/database/prisma.service';
import { RecoveryRepository } from 'src/repositories/recovery.repository';
import { PrismaRecoveryRepository } from './prisma-recovery.repository';

@Module({
  imports: [UsersModule, MailingModule],
  controllers: [RecoveryController],
  providers: [
    RecoveryService,
    PrismaService,
    { provide: RecoveryRepository, useClass: PrismaRecoveryRepository },
  ],
})
export class RecoveryModule {}
