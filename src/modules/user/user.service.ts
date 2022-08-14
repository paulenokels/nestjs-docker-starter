import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../../dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { VerificationService } from '../verification/verification.service';

export type findUserCriteria = 'email' | 'phone' | 'id';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => VerificationService))
    private verificationSerivce: VerificationService,
  ) {}

  public async findUserByCriteria(criteria: findUserCriteria, value): Promise<User> {
    return await this.userRepo.createQueryBuilder('user').where(`user.${criteria} = :value`, { value }).getOne();
  }
  public async createUser(registerDto: RegisterDto): Promise<{ success: boolean; message: string }> {
    const userEmailExists = await this.findUserByCriteria('email', registerDto.email);
    if (userEmailExists) {
      return { success: false, message: 'User with that email already exists' };
    }
    const userPhoneExists = await this.findUserByCriteria('phone', registerDto.phone);
    if (userPhoneExists) {
      return { success: false, message: 'User with that phone number already exists' };
    }

    const fullName = `${registerDto.lastName} ${registerDto.otherName || ''} ${registerDto.firstName}`;
    const password = await bcrypt.hash(registerDto.password, 10);

    const user = new User(
      null,
      registerDto.firstName,
      registerDto.lastName,
      registerDto.otherName,
      fullName,
      registerDto.email,
      registerDto.phone,
      null,
      password,
    );
    await this.userRepo.save(user);
    this.verificationSerivce.sendVerificationCode(registerDto.email);
    return { success: true, message: 'User created successfully' };
  }

  public async save(user: User) {
    this.userRepo.save(user);
  }
}
