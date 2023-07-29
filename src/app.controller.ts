import { Controller, Get, HttpCode } from '@nestjs/common';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {

  @Public()
  @Get('health')
  @HttpCode(200)
  getHello(): string {
    return 'OK';
  }
}
