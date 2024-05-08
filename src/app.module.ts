import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RatingsModule } from './ratings/ratings.module';
@Module({
  imports: [
    VideosModule,
    CommentsModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secrets.jwtSecret'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
