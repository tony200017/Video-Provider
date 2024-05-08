import { Controller, Get, Param,  Query, UseGuards,Request } from '@nestjs/common';
import { VideosService } from './videos.service';
import { ParamIdDto, QueryFilterDto } from './dto/video.dto';
import { AuthGuard } from 'src/guards/authentication';
import { UserRequest } from 'src/global/types';
import { SourceAuthenticationGuard } from 'src/guards/source-authentication';


@Controller('api/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  

  @Get()
  @UseGuards(SourceAuthenticationGuard)
  async findAll(@Query() query:QueryFilterDto) {
    return this.videosService.findAll(query.title,query.sortRating);
  }

  
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param() param: ParamIdDto,@Request() req:UserRequest) {
    
    return this.videosService.findOne(param.id,req.user);
  }

  
}
