import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SignInDto } from './dtos/sign-in.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(userInfo: CreateUserDto) {
    const { password } = userInfo;
    const hashedPassword = bcrypt.hash(password, 10);
    userInfo.password = hashedPassword;
    return this.userService.createUser(userInfo);
  }
  async validateUser(userCredintials: SignInDto) {
    const { email, password } = userCredintials;
    const user = await this.userService.find('email', email)[0];
    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
