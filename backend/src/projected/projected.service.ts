import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projected } from './entities/projected.entity';
import { CreateProjectedDto } from './dto/create-projected.dto';
import { UpdateProjectedDto } from './dto/update-projected.dto';

@Injectable()
export class ProjectedService {
  constructor(
    @InjectRepository(Projected)
    private readonly projectedRepository: Repository<Projected>,
  ) {}

  async create(createProjectedDto: CreateProjectedDto): Promise<Projected> {
    const projected = this.projectedRepository.create(createProjectedDto);
    return await this.projectedRepository.save(projected);
  }

  async findAll(): Promise<Projected[]> {
    return await this.projectedRepository.find({
      relations: ['curriculum', 'section', 'courses'], // Include curriculum relation if needed
    });
  }

  async findOne(id: number): Promise<Projected> {
    const projected = await this.projectedRepository.findOne({
      where: { project_id: id },
      relations: ['curriculum'],
    });
    if (!projected) {
      throw new NotFoundException(`Projected entry with id ${id} not found`);
    }
    return projected;
  }

  async update(
    id: number,
    updateProjectedDto: UpdateProjectedDto,
  ): Promise<Projected> {
    const projected = await this.findOne(id);
    Object.assign(projected, updateProjectedDto);
    return await this.projectedRepository.save(projected);
  }

  async remove(id: number): Promise<void> {
    const projected = await this.findOne(id);
    await this.projectedRepository.remove(projected);
  }
}
