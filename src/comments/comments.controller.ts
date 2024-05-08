import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddCommentDto, IdDto, CreateCommentDto, UpdateCommentDto, AddReplytDto } from './dto/comment.dto';
import { UserRequest } from 'src/global/types';
import { AuthGuard } from 'src/guards/authentication';


@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createComment(@Body() addCommentDto: AddCommentDto,@Request() req:UserRequest) { 
    return this.commentsService.createComment(addCommentDto,req.user);
  }

  @Post(":id")
  @UseGuards(AuthGuard)
  async createReply(@Body() addReplyDto: AddReplytDto,@Request() req:UserRequest,@Param() param:IdDto) { 
    return this.commentsService.createReply(addReplyDto,req.user,param.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findAll(@Param() param: IdDto) {
    return this.commentsService.findAll(param.id);
  }

  

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param() param: IdDto, @Body() updateCommentDto: UpdateCommentDto,@Request() req:UserRequest) {
    return this.commentsService.update(param.id, updateCommentDto,req.user._id);
  }

  
}
