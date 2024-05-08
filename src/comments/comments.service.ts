import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import {
  AddCommentDto,
  AddReplytDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './dto/comment.dto';
import mongoose, { Model, Mongoose } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comments.model';
import { User } from 'src/global/types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async createComment(addCommentDto: AddCommentDto | AddReplytDto, user: User) {
    let createComment: CreateCommentDto;
    if (addCommentDto.hasOwnProperty('videoId')) {
      let { comment, videoId } = addCommentDto as AddCommentDto;
      createComment = {
        comment,
        videoId,
        createdBy: user._id,
        email: user.email,
      };
    } else {
      let { comment } = addCommentDto as AddReplytDto;
      createComment = {
        comment,
        createdBy: user._id,
        email: user.email,
      };
    }
    const createdComment = new this.commentModel(createComment);
    return createdComment.save();
  }
  async createReply(
    addReplyDto: AddReplytDto,
    user: User,
    commentId: mongoose.Types.ObjectId,
  ) {
    const comment = await this.find(commentId);
    if(!comment){throw new NotFoundException('comment not found')}
    const createdComment = await this.createComment(addReplyDto, user);

    comment.replies.push(createdComment._id);
    comment.save();
    return createdComment;
  }

  async find(id: mongoose.Types.ObjectId) {
    const comment = this.commentModel.findById(id);
    return comment;
  }

  async findAll(id: mongoose.Types.ObjectId) {
    return this.commentModel.aggregate([
      { $match: { videoId: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'comments',
          localField: 'replies',
          foreignField: '_id',
          as: 'result',
        },
      },
      { $unwind: { path: '$result', preserveNullAndEmptyArrays: true } },
      { $sort: { 'result.createdAt': -1 } },
      {
        $group: {
          _id: '$_id',
          comment: { $first: '$comment' },
          email: { $first: '$email' },
          createdAt: { $first: '$createdAt' },
          //createdBy: { $first: '$createdBy' },
          // videoId: { $first: '$videoId' },
          replies: {
            $push: {
              comment: '$result.comment',
              email: '$result.email',
              createdAt: '$result.createdAt',
            },
          },
         
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateCommentDto: UpdateCommentDto,
    userId: mongoose.Types.ObjectId,
  ) {
    let comment = await this.find(id);
    if (comment.createdBy == userId) {
      return this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
        new: true,
      });
    } else {
      throw new ForbiddenException('not your comment');
    }
  }
}
