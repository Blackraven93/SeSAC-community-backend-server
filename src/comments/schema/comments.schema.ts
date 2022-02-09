import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  // db 제작 시 timesave
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 유저 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    // 컬렉션 이름
    ref: 'birds',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠(댓글 내용)',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    // 컬렉션 이름
    ref: 'birds',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
