import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectedService } from './projected.service';
import { ProjectedController } from './projected.controller';
import { Projected } from './entities/projected.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projected])],
  controllers: [ProjectedController],
  providers: [ProjectedService],
  exports: [ProjectedService], // optional: only if used in other modules
})
export class ProjectedModule {}
