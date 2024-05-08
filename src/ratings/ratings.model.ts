import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type RatingDocument = mongoose.HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
  

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Types.ObjectId;

  @Prop()
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  videoId: mongoose.Types.ObjectId;
}


export const RatingSchema = SchemaFactory.createForClass(Rating);
RatingSchema.index({ videoId: 1 });
RatingSchema.index({ userId: 1 });