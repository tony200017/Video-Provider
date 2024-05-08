import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './ratings.model';
import { VideosModule } from 'src/videos/videos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    VideosModule
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
