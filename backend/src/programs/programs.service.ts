import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const newProgram = this.programRepository.create(createProgramDto);
    return await this.programRepository.save(newProgram);
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find({
      relations: ['curricula', 'curricula.projected'],
    });
  }

  async findOne(id: number): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { program_id: id },
      relations: ['curricula', 'curricula.projected'],
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return program;
  }

  async update(
    id: number,
    updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    const program = await this.findOne(id);
    const updated = Object.assign(program, updateProgramDto);
    return await this.programRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const program = await this.findOne(id);
    await this.programRepository.remove(program);
  }
}
