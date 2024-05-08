import { IsArray, IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
export class CreateCommentDto {
  @IsString()
  comment: string;
  @IsMongoId()
  createdBy: mongoose.Types.ObjectId;
  @IsEmail()
  email:string;
  @IsOptional()
  @IsMongoId()
  videoId?: mongoose.Types.ObjectId;
  // @IsArray()
  // @IsMongoId({ each: true })
  // replies: [mongoose.Types.ObjectId];
}

export class AddCommentDto {
  @IsString()
  comment: string;
  @IsMongoId()
  videoId: mongoose.Types.ObjectId;
}

export class AddReplytDto {
  @IsString()
  comment: string;
}

export class IdDto {
  @IsMongoId()
  id:mongoose.Types.ObjectId
}

export class UpdateCommentDto {
  @IsString()
  comment:string
}
