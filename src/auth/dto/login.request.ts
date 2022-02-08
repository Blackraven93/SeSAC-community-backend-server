import { PickType } from '@nestjs/swagger';
import { User } from 'src/users//schema/users.schema';

export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}
