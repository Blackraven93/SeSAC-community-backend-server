import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserReqeustDto } from '../dto/users.request.dto';
import { User } from '../schema/users.schema';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUser() {
    const allUser = await this.usersRepository.findAll();
    const readOnlyUsers = allUser.map((user) => user.readOnlyData);
    return readOnlyUsers;
  }

  async signUp(body: UserReqeustDto) {
    const { nickname, email, password, phoneNumber, campus, lecture } = body;

    const isUserExist = await this.usersRepository.existsByEmail(email);
    const isNicnameExist = await this.usersRepository.existsByNickname(
      nickname,
    );
    const isPhoneNumber = await this.usersRepository.existsByPhoneNumber(
      phoneNumber,
    );

    if (isUserExist) {
      throw new UnauthorizedException('해당 계정은 이미 존재합니다!');
    }

    if (isNicnameExist) {
      throw new UnauthorizedException('해당 닉네임은 이미 존재합니다!');
    }

    if (isPhoneNumber) {
      throw new UnauthorizedException('해당 핸드폰 번호는 이미 존재합니다!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      nickname,
      email,
      password: hashedPassword,
      phoneNumber,
      campus,
      lecture,
    });
    return user.readOnlyData;
  }

  async uploadImg(user: User, files: Express.Multer.File[]) {
    const fileName = `users/${files[0].filename}`;
    const newUser = await this.usersRepository.findByIdAndUpdateImg(
      user.id,
      fileName,
    );
    return newUser;
  }
}
