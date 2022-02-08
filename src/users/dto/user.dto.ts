import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../schema/users.schema';

export class ReadOnlyBirdDto extends PickType(User, [
  'email',
  'nickname',
  'phoneNumber',
  'campus',
  'lecture',
] as const) {
  @ApiProperty({
    example: 'reblackraven@gmail.com',
    description: 'This is sample email',
    required: true,
  })
  id: string;
}
