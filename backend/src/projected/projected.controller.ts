import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectedService } from './projected.service';
import { CreateProjectedDto } from './dto/create-projected.dto';
import { UpdateProjectedDto } from './dto/update-projected.dto';

@Controller('projected')
export class ProjectedController {
  constructor(private readonly projectedService: ProjectedService) {}

  @Post('add-projected')
  create(@Body() createProjectedDto: CreateProjectedDto) {
    return this.projectedService.create(createProjectedDto);
  }

  @Get('get-projected')
  findAll() {
    return this.projectedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectedService.findOne(id);
  }

  @Patch('update-project/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectedDto: UpdateProjectedDto,
  ) {
    return this.projectedService.update(id, updateProjectedDto);
  }

  @Delete('delete-id/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectedService.remove(id);
  }
}
