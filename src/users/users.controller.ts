import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // users//all
  @Get()
  getAllUser(): string {
    return `all Users`;
  }

  //users/:id
  @Get(':id')
  getUser() {
    return 'get user';
  }

  // 회원가입
  @Post()
  createUser() {
    return 'create user';
  }

  // 교체
  @Put(':id')
  updateUser() {
    return 'update user';
  }

  // 부분 수정
  @Patch('id')
  updatePartialUser() {
    return;
  }

  @Delete(':id')
  deleteUser() {
    return;
  }
}
