import { PickType } from '@nestjs/swagger';
import { User } from '../schema/users.schema';

export class UserReqeustDto extends PickType(User, [
  'nickname',
  'email',
  'phoneNumber',
  'password',
  'campus',
  'lecture',
]) {}
