import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './videos.model';
import mongoose, { Model, ObjectId } from 'mongoose';
import { SortOptions, minAgeForFilmRating } from 'src/global/variable';
import { User } from 'src/global/types';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async findAll(searchTitle: string, sortRating: string) {
    let pipeline: any[] = [];

    if (searchTitle) {
      pipeline.push({
        $match: { title: { $regex: new RegExp(searchTitle, 'i') } },
      });
    }

    if (sortRating) {
      pipeline.push({
        $sort: { averageRating: sortRating === SortOptions.asc ? 1 : -1 },
      });
    }

    pipeline.push({
      $project: {
        _id: 0,
        videoUrl: 0,
      },
    });

    const videos = await this.videoModel.aggregate(pipeline);
    return videos;
  }

  async findOne(id: ObjectId, user: User) {
    const age = this.calculateAge(user.dateOfBirth);

    const video = await this.videoModel.findById(id);
    const minAge = minAgeForFilmRating[video.ageRestriction];
    if (age > minAge) {
      return video.videoUrl;
    } else {
      throw new ForbiddenException('underage');
    }
  }

  calculateAge(dateOfBirth: Date): number {
    const currentDate = new Date();
    const dob = new Date(dateOfBirth);

    let age = currentDate.getFullYear() - dob.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const dobMonth = dob.getMonth() + 1;
    if (
      currentMonth < dobMonth ||
      (currentMonth === dobMonth && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  async update(id: mongoose.Types.ObjectId, averageRating: number) {
    return this.videoModel.findByIdAndUpdate(id, {
      averageRating: averageRating,
    });
  }
}
