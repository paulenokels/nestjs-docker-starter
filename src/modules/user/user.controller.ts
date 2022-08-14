import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../../dtos/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async register(@Body() body: RegisterDto) {
    return this.userService.createUser(body);
  }
}
