import { IsEmail, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  resetCode: string;

  @IsString()
  @Length(6)
  newPassword: string;
}
