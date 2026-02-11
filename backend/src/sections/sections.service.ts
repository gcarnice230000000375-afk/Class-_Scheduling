import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionRepository.create(createSectionDto);
    return this.sectionRepository.save(section);
  }

  async findAll(): Promise<Section[]> {
    return await this.sectionRepository.find({
      relations: ['projected'], // Correct relation name
    });
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionRepository.findOne({
      where: { section_id: id },
      relations: ['projected'], // Correct relation name
    });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }

  async update(
    id: number,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    await this.sectionRepository.update(id, updateSectionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sectionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Section #${id} not found`);
    }
  }
}
