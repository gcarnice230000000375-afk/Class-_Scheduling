import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curriculum } from './entities/curriculum.entity';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(Curriculum)
    private readonly curriculumRepository: Repository<Curriculum>,
  ) {}

  async create(createCurriculumDto: CreateCurriculumDto): Promise<Curriculum> {
    const newCurriculum = this.curriculumRepository.create(createCurriculumDto);
    return await this.curriculumRepository.save(newCurriculum);
  }

  async findAll(): Promise<Curriculum[]> {
    return await this.curriculumRepository.find({
      relations: ['program', 'projected'],
    });
  }

  async findOne(id: number): Promise<Curriculum> {
    const curriculum = await this.curriculumRepository.findOne({
      where: { curriculum_id: id },
      relations: ['program', 'projected'],
    });

    if (!curriculum) {
      throw new NotFoundException(`Curriculum with ID ${id} not found`);
    }

    return curriculum;
  }

  async update(
    id: number,
    updateCurriculumDto: UpdateCurriculumDto,
  ): Promise<Curriculum> {
    const curriculum = await this.findOne(id);
    const updated = Object.assign(curriculum, updateCurriculumDto);
    return await this.curriculumRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const curriculum = await this.findOne(id);
    await this.curriculumRepository.remove(curriculum);
  }
}
