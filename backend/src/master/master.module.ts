import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './entities/master.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Master])],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService], // ✅ This line makes the service available to other modules
})
export class MasterModule {}
