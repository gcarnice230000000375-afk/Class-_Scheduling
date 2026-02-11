import { Module } from '@nestjs/common';
import { BachelorService } from './bachelor.service';
import { BachelorController } from './bachelor.controller';
import { Bachelor } from './entities/bachelor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bachelor])],
  controllers: [BachelorController],
  providers: [BachelorService],
  exports: [BachelorService], // ✅ Export the service
})
export class BachelorModule {}
