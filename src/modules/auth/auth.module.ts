import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { UserModule } from '../user/user.module';
import { VerificationModule } from '../verification/verification.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { config } from 'dotenv';
import ResetPasswordCode from 'src/entities/ResetPasswordCode.entity';
import { EmailModule } from '../email/email.module';
config();

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, ResetPasswordCode]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1500d' },
    }),
    VerificationModule,
    UserModule,
    EmailModule
  ],
})
export class AuthModule {}
