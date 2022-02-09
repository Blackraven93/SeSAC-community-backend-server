import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Comments } from 'src/comments/schema/comments.schema';

const options: SchemaOptions = {
  // db 제작시 타임 세이브
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'brownWoodpecker@gmail.com',
    description: '이메일을 입력합니다.',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @Prop({
    unique: true,
    required: true,
  })
  @IsNotEmpty()
  phoneNumber: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  campus: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  lecture: string;

  @Prop({
    default: `https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png`,
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    campus: string;
    lecture: string;
    imgUrl: string;
  };
  readonly comments: Comments[];
}

export const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    nickname: this.nickname,
    email: this.email,
    phoneNumber: this.phoneNumber,
    campus: this.campus,
    lecture: this.lecture,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_UserSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

_UserSchema.set('toObject', { virtuals: true });
_UserSchema.set('toJSON', { virtuals: true });

export const UserSchema = _UserSchema;
