import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserReqeustDto } from '../dto/users.request.dto';
import { User } from '../schema/users.schema';

Injectable();
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    // 보안상의 이유로 select 뒤에 password만 제외하고 가져온다.
    // email이나 name 만 가져오고 싶은 경우 select('email name')
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserByPhonenumber(phoneNumber: string): Promise<User | null> {
    const user = await this.userModel.findOne({ phoneNumber });
    return user;
  }

  async existsByEmail(email: string) {
    const result = await this.userModel.exists({ email });
    console.log(result);
    return result;
  }

  async existsByPhoneNumber(phoneNumber: string) {
    const result = await this.userModel.exists({ phoneNumber });
    return result;
  }

  async existsByNickname(nickname: string) {
    const result = await this.userModel.exists({ nickname });
    return result;
  }

  async create(user: UserReqeustDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
