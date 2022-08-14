import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  otherName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
