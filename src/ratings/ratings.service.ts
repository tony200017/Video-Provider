import { ConflictException, Injectable } from '@nestjs/common';
import { AddRatingDto, CreateRatingDto, IdDto } from './dto/rating.dto';
import { User } from 'src/global/types';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './ratings.model';
import { VideosService } from 'src/videos/videos.service';

@Injectable()
export class  RatingsService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>,private videoService:VideosService) {}
  async create(addRatingDto: AddRatingDto,videoId: mongoose.Types.ObjectId ,user: User) {
    const checkRating=await this.findbyUserId(user._id);
    if(checkRating){
      throw new ConflictException('You have already rated.');
    }
    const createRating: CreateRatingDto = { ...addRatingDto,videoId,userId: user._id };
    let rating = new this.ratingModel(createRating);
    await rating.save();
    this.updateAverage(videoId);
    return;
  }

  async updateAverage(id: mongoose.Types.ObjectId) {
    let newAvgRating =await this.ratingModel.aggregate([
     { $match: { videoId: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: '$videoId', avgRating: { $avg: '$rating' } } },
    ]);
    let averageRating = newAvgRating[0].avgRating;
    this.videoService.update(id,averageRating)
  }

  async findbyUserId(id:mongoose.Types.ObjectId){
  return this.ratingModel.findOne({userId:id});
  }
}
