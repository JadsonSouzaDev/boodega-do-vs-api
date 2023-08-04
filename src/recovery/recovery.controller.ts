import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { RequestRecoveryDto } from './dto/request-recovery.dto';
import { Public } from 'src/decorators/public.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

  @Public()
  @Post()
  create(@Body() requestRecoveryDto: RequestRecoveryDto) {
    return this.recoveryService.requestRecovery(requestRecoveryDto);
  }

  @Public()
  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.recoveryService.updatePassword(code, updatePasswordDto);
  }
}
