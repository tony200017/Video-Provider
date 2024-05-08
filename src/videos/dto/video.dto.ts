import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Mongoose } from 'mongoose';
import { FilmRating, SortOptions } from 'src/global/variable';

export class CreateVideoDto {
  @IsString()
  videoUrl: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsString()
  @IsEnum(FilmRating)
  ageRestriction: FilmRating;

  // @IsNumber()
  // @Min(0)
  // @Max(5)
  // averageRating: number;
}

export class QueryFilterDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsString()
  @IsOptional()
  @IsEnum(SortOptions)
  sortRating?: SortOptions;
}

export class ParamIdDto {
  @IsMongoId()
  id: mongoose.Schema.Types.ObjectId;
}
