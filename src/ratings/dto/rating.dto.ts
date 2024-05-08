import { IsMongoId, IsNumber, Max, Min } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRatingDto {
  @IsMongoId()
  userId: mongoose.Types.ObjectId;
  @IsMongoId()
  videoId: mongoose.Types.ObjectId;
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}

export class AddRatingDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}

export class IdDto {
  @IsMongoId()
  id: mongoose.Types.ObjectId;
}
