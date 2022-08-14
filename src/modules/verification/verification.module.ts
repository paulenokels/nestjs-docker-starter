import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/modules/email/email.module';
import VerificationCode from 'src/entities/VerificationCode.entity';
import { VerificationService } from './verification.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [VerificationService],
  imports: [TypeOrmModule.forFeature([VerificationCode]), EmailModule, forwardRef(() => UserModule)],
  exports: [TypeOrmModule, VerificationService],
})
export class VerificationModule {}
