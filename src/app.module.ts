import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { VerificationModule } from './modules/verification/verification.module';
import { EmailModule } from './modules/email/email.module';
import { User } from './entities/User.entity';
import VerificationCode from './entities/VerificationCode.entity';
import ResetPasswordCode from './entities/ResetPasswordCode.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, VerificationCode, ResetPasswordCode],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    VerificationModule,
    EmailModule,
  ],
})
export class AppModule {}
