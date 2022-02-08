import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지 확인
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) throw new UnauthorizedException('해당 계정이 없습니다.');

    //* password 일치 여부 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated)
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');

    const payload = { email: email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
