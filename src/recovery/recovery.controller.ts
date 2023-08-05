import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { RequestRecoveryDto } from './dto/request-recovery.dto';
import { Public } from 'src/decorators/public.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

  @Public()
  @Post()
  @HttpCode(200)
  async create(@Body() requestRecoveryDto: RequestRecoveryDto) {
    try {
      await this.recoveryService.requestRecovery(requestRecoveryDto);
      return { message: 'solicitação enviada com sucesso' };
    } catch (error) {
      throw new BadRequestException(MessagesHelper.INVALID_RECOVERY);
    }
  }

  @Public()
  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      await this.recoveryService.updatePassword(code, updatePasswordDto);
      return { message: 'senha atualizada com sucesso' };
    } catch (error) {
      throw new BadRequestException(MessagesHelper.INVALID_RECOVERY);
    }
  }
}
