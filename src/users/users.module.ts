import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { Comments, CommentsSchema } from 'src/comments/schema/comments.schema';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repository/users.repository';
import { User, UserSchema } from './schema/users.schema';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule),
  ],

  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
