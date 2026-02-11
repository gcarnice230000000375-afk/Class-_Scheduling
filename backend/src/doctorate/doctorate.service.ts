import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctorate } from './entities/doctorate.entity';
import { CreateDoctorateDto } from './dto/create-doctorate.dto';
import { UpdateDoctorateDto } from './dto/update-doctorate.dto';

@Injectable()
export class DoctorateService {
  constructor(
    @InjectRepository(Doctorate)
    private readonly doctorateRepository: Repository<Doctorate>,
  ) {}

  async create(createDoctorateDto: CreateDoctorateDto): Promise<Doctorate> {
    const doctorate = this.doctorateRepository.create(createDoctorateDto);
    return this.doctorateRepository.save(doctorate);
  }

  async findAll(): Promise<Doctorate[]> {
    return this.doctorateRepository.find();
  }

  async findOne(id: number): Promise<Doctorate> {
    const doctorate = await this.doctorateRepository.findOne({
      where: { doctorateprogram_id: id },
    });
    if (!doctorate) {
      throw new NotFoundException(`Doctorate with ID ${id} not found`);
    }
    return doctorate;
  }

  async update(
    id: number,
    updateDoctorateDto: UpdateDoctorateDto,
  ): Promise<Doctorate> {
    await this.doctorateRepository.update(id, updateDoctorateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.doctorateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Doctorate with ID ${id} not found`);
    }
  }
}
