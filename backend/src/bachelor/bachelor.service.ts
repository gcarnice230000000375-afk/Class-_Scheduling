import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBachelorDto } from './dto/create-bachelor.dto';
import { UpdateBachelorDto } from './dto/update-bachelor.dto';
import { Bachelor } from './entities/bachelor.entity';

@Injectable()
export class BachelorService {
  constructor(
    @InjectRepository(Bachelor)
    private readonly bachelorRepository: Repository<Bachelor>,
  ) {}

  async create(createBachelorDto: CreateBachelorDto): Promise<Bachelor> {
    const newBachelor = this.bachelorRepository.create(createBachelorDto);
    return await this.bachelorRepository.save(newBachelor);
  }

  async findAll(): Promise<Bachelor[]> {
    return await this.bachelorRepository.find();
  }

  async findOne(bachelorprogram_id: number): Promise<Bachelor> {
    const bachelor = await this.bachelorRepository.findOneBy({
      bachelorprogram_id,
    });
    if (!bachelor) {
      throw new NotFoundException(
        `Bachelor with ID ${bachelorprogram_id} not found`,
      );
    }
    return bachelor;
  }

  async update(
    bachelorprogram_id: number,
    updateBachelorDto: UpdateBachelorDto,
  ): Promise<Bachelor> {
    const bachelor = await this.bachelorRepository.preload({
      bachelorprogram_id,
      ...updateBachelorDto,
    });
    if (!bachelor) {
      throw new NotFoundException(
        `Bachelor with ID ${bachelorprogram_id} not found`,
      );
    }
    return await this.bachelorRepository.save(bachelor);
  }

  async remove(bachelorprogram_id: number): Promise<void> {
    const result = await this.bachelorRepository.delete(bachelorprogram_id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Bachelor with ID ${bachelorprogram_id} not found`,
      );
    }
  }
}
