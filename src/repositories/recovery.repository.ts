import { Recovery } from 'src/recovery/entities/recovery.entity';

export abstract class RecoveryRepository {
  abstract create(recovery: Recovery): Promise<Recovery>;
  abstract findByCode(code: string): Promise<Recovery>;
  abstract findByEmail(code: string): Promise<Recovery>;
  abstract update(id: string, recovery: Recovery): Promise<Recovery>;
  abstract delete(id: string): Promise<Recovery>;
}
