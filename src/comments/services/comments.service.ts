import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from 'src/users/repository/users.repository';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { Comments } from '../schema/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly usersRepository: UsersRepository,
  ) {}
  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createComment(id: string, commentData: CommentsCreateDto) {
    try {
      const targetBird = await this.usersRepository.findUserByIdWithoutPassword(
        id,
      );
      const { contents, author } = commentData;
      const validatedAuthor =
        await this.usersRepository.findUserByIdWithoutPassword(author);
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetBird._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
