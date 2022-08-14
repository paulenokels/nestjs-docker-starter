import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createPasswordHash, createRandom6DigitNumber } from 'src/utils/stringUtils';
import { EmailService } from '../email/email.service';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private emailService: EmailService, @InjectRepository(ResetPasswordCode)
  private resetPasswordCodeRepo: Repository<ResetPasswordCode>,) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByCriteria('email', email);
    if (user && (await bcrypt.compare(password, user.password))) {
      //remove the password from what is to be returned to the user
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Wrong credentials provided ', HttpStatus.BAD_REQUEST);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async sendResetPasswordCode(email: string): Promise<boolean> {
    const user = await this.userService.findUserByCriteria('email', email);
    if (!user) return false;
    const resetCode = createRandom6DigitNumber();
    await this.resetPasswordCodeRepo.save({ resetCode, userId: user.id });
    await this.emailService.sendPasswordResetCode(email, resetCode);
    return true;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    const user = await this.userService.findUserByCriteria('email', resetPasswordDto.email);
    if (!user) return false;
    const codeExists = await this.resetPasswordCodeRepo.findOne({ where: { userId: user.id, resetCode: resetPasswordDto.resetCode } });
    if (!codeExists) return false;
    const newPassword = await createPasswordHash(resetPasswordDto.newPassword);
    user.password = newPassword;
    await this.userService.save(user);
    return true;
  }
}
