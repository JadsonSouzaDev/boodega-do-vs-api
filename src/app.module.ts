import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SongsModule } from './songs/songs.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecoveryModule } from './recovery/recovery.module';
import { MailingModule } from './mailing/mailing.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SongRequestsModule } from './song-requests/song-requests.module';
import { OrdersModule } from './orders/orders.module';
import { SongVersionsModule } from './song-versions/song-versions.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    SongsModule,
    AuthModule,
    UsersModule,
    RecoveryModule,
    MailingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    SongRequestsModule,
    OrdersModule,
    SongVersionsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
