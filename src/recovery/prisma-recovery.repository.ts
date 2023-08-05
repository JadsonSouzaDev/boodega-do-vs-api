import { Injectable } from '@nestjs/common';
import { RecoveryRepository } from 'src/repositories/recovery.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Recovery } from '@prisma/client';

@Injectable()
export class PrismaRecoveryRepository implements RecoveryRepository {
  constructor(private prisma: PrismaService) {}

  create(recovery: Recovery): Promise<Recovery> {
    return this.prisma.recovery.create({
      data: recovery,
    });
  }

  findByCode(code: string): Promise<Recovery> {
    return this.prisma.recovery.findFirstOrThrow({
      where: { code },
    });
  }

  findByEmail(email: string): Promise<Recovery> {
    return this.prisma.recovery.findFirstOrThrow({
      where: { email },
    });
  }

  update(id: string, recovery: Recovery): Promise<Recovery> {
    return this.prisma.recovery.update({
      data: recovery,
      where: { id },
    });
  }

  delete(id: string): Promise<Recovery> {
    return this.prisma.recovery.delete({
      where: { id },
    });
  }
}
