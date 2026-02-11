import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from './entities/time.entity';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
  ) {}

  async create(createTimeDto: CreateTimeDto): Promise<Time> {
    const time = this.timeRepository.create(createTimeDto);
    return await this.timeRepository.save(time);
  }

  async findAll(): Promise<Time[]> {
    return await this.timeRepository.find();
  }

  async findOne(id: number): Promise<Time> {
    const time = await this.timeRepository.findOne({ where: { time_id: id } });
    if (!time) {
      throw new NotFoundException(`Time with ID ${id} not found`);
    }
    return time;
  }

  async update(id: number, updateTimeDto: UpdateTimeDto): Promise<Time> {
    const time = await this.findOne(id);
    Object.assign(time, updateTimeDto);
    return await this.timeRepository.save(time);
  }

  async remove(id: number): Promise<void> {
    const time = await this.findOne(id);
    await this.timeRepository.remove(time);
  }
}
