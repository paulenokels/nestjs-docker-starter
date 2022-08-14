import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import VerificationCode from 'src/entities/VerificationCode.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationCode)
    private verficationCodeRepo: Repository<VerificationCode>,
    private emailService: EmailService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  public async sendVerificationCode(email: string) {
    const user = await this.userService.findUserByCriteria('email', email);
    if (!user) return -1;
    const code: string = this.generateCode();
    const data = {
      userId: user.id,
      code,
    };

    this.verficationCodeRepo.save(data);
    this.emailService.sendVerificationCode(email, code);
  }

  private generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  public async confirmCode(email: string, code: string): Promise<boolean> {
    const user = await this.userService.findUserByCriteria('email', email);
    if (!user) return false;
    const codeData = await this.verficationCodeRepo.findOne({ where: { userId: user.id, code } });
    if (!codeData) return false;
    //confirm the user email
    const emailVerified = new Date();
    user.emailVerified = emailVerified;
    this.userService.save(user);
    //delete all verification code for this user
    this.verficationCodeRepo.delete({ userId: user.id });
    return true;
  }
}
