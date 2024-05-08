import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FilmRating } from '../global/variable';

export type VideoDocument = mongoose.HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {
  
  
  @Prop()
  videoUrl: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop({type:String})
  ageRestriction: FilmRating;

  @Prop({default:0})
  averageRating: number;

  
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.index({ title: 1 });
VideoSchema.index({averageRating: 1 });
