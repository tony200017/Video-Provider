import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment',default:[] })
  replies: [mongoose.Types.ObjectId];

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  createdBy: mongoose.Types.ObjectId;

  @Prop()
  email:string;

  @Prop()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  videoId: mongoose.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ videoId: 1, createdAt: -1 });
