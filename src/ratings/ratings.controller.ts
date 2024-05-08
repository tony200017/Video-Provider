import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AddRatingDto, CreateRatingDto, IdDto } from './dto/rating.dto';
import { AuthGuard } from 'src/guards/authentication';
import { UserRequest } from 'src/global/types';


@Controller('api/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  async create(@Body() addRatingDto: AddRatingDto,@Param()param:IdDto,@Request() req : UserRequest) {
    return this.ratingsService.create(addRatingDto,param.id,req.user);
  }

}
