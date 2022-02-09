import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { ReadOnlyUserDto } from '../dto/user.dto';
import { UserReqeustDto } from '../dto/users.request.dto';
import { User } from '../schema/users.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly UsersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // users/:id
  @ApiOperation({ summary: '현재 유저 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCurrentUser(@CurrentUser() user: User) {
    return user.readOnlyData;
  }

  // users//all
  @ApiOperation({ summary: '모든 유저 가져오기' })
  @Get('all')
  getAllUser() {
    return this.UsersService.getAllUser();
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error..',
  })
  @ApiResponse({
    status: 200,
    description: '성공!!',
    type: ReadOnlyUserDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserReqeustDto) {
    console.log(body);
    return this.UsersService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login() {
    return 'login';
  }

  @Post('logout')
  async logout() {
    return 'log out';
  }

  // 교체
  @Put(':id')
  updateUser() {
    return 'update user';
  }

  // 부분 수정
  @Patch(':id')
  updatePartialUser() {
    return;
  }

  @Delete(':id')
  deleteUser() {
    return;
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('users')))
  @UseGuards(JwtAuthGuard)
  @Post('users/:id/upload')
  uploadUserProfileImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() user: User,
  ) {
    return this.UsersService.uploadImg(user, files);
  }
}
