// master.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Master } from './entities/master.entity';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Master)
    private readonly masterRepository: Repository<Master>,
  ) {}

  async create(createMasterDto: CreateMasterDto): Promise<Master> {
    const master = this.masterRepository.create(createMasterDto);
    return await this.masterRepository.save(master);
  }

  async findAll(): Promise<Master[]> {
    return await this.masterRepository.find();
  }

  async findOne(id: number): Promise<Master> {
    const master = await this.masterRepository.findOne({
      where: { masterprogram_id: id },
    });
    if (!master) {
      throw new NotFoundException(`Master with id ${id} not found`);
    }
    return master;
  }

  async update(id: number, updateMasterDto: UpdateMasterDto): Promise<Master> {
    const master = await this.findOne(id);
    Object.assign(master, updateMasterDto);
    return await this.masterRepository.save(master);
  }

  async remove(id: number): Promise<void> {
    const result = await this.masterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Master with id ${id} not found`);
    }
  }
}
