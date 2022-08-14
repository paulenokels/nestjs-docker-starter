import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from 'src/dtos/verifyemail.dto';
import { VerificationService } from '../verification/verification.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResetPasswordDto } from 'src/dtos/resetpassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private verificationSerivce: VerificationService) {}

  @Post('verifyEmail')
  public async verifyUserEmail(@Body() body: VerifyEmailDto) {
    const email = body.email;
    const code = body.code;
    const verifyEmail = await this.verificationSerivce.confirmCode(email, code);
    if (verifyEmail) {
      return {
        success: true,
        msg: 'Email verified successfully',
      };
    }
    return {
      success: false,
      msg: 'Failed to verify email, check code and try again',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.login(req.user);
    return { success: true, user };
  }


  @Post('password/sendCode')
  async sendResetPasswordCode(@Body() body) {
    const email = body.email;
    const codeSent = await this.authService.sendResetPasswordCode(email);
    if (codeSent) {
      return { success: true, msg: 'Password reset code sent to ' + email };
    }
    return { success: false, msg: 'Email is not registered: ' + email };
  }

  @Post('password/reset')
  async resetPassword(@Body() body: ResetPasswordDto) {
    const resetPassword = await this.authService.resetPassword(body);
    if (resetPassword) {
      return { success: true, msg: 'Password reset was successful' };
    }
    return { success: false, msg: 'Invalid password reset code' };
  }
}
