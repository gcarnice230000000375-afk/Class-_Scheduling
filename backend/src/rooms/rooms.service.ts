import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(room);
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({ where: { room_id: id } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id); // Ensure it exists
    const updatedRoom = Object.assign(room, updateRoomDto);
    return await this.roomRepository.save(updatedRoom);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    return await this.roomRepository.remove(room);
  }
}
