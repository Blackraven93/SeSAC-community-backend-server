import { PickType } from '@nestjs/swagger';
import { Comments } from '../schema/comments.schema';

export class CommentsCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
