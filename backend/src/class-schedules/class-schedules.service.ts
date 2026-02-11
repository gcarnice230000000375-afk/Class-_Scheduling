import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { ClassSchedule } from './entities/class-schedule.entity';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';

@Injectable()
export class ClassSchedulesService {
  constructor(
    @InjectRepository(ClassSchedule)
    private readonly scheduleRepo: Repository<ClassSchedule>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createDto: CreateClassScheduleDto): Promise<ClassSchedule[]> {
    const savedSchedules: ClassSchedule[] = [];

    for (const day of createDto.schedule_days) {
      const schedule = this.scheduleRepo.create({
        instructor: { instructor_id: createDto.instructor_id } as any,
        course: { course_id: createDto.course_id } as any,
        room: { room_id: createDto.room_id } as any,
        project: { project_id: createDto.project_id } as any,
        schedule_days: day, // single day per row
        time_start: createDto.time_start,
        time_end: createDto.time_end,
      });

      const saved = await this.scheduleRepo.save(schedule);
      savedSchedules.push(saved);
    }

    return savedSchedules;
  }

  async findAll(): Promise<ClassSchedule[]> {
    return await this.scheduleRepo.find({
      relations: [
        'instructor',
        'instructor.bachelor',
        'course.curriculum',
        'course.curriculum.program',
        'room',
        'project',
      ],
    });
  }

  async findOne(id: number): Promise<ClassSchedule> {
    const schedule = await this.scheduleRepo.findOne({
      where: { schedule_id: id },
      relations: [
        'instructor',
        'course',
        'course.curriculum', // ✅ nested relation
        'room',
        'project',
      ],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }
  async update(
    id: number,
    updateDto: UpdateClassScheduleDto,
  ): Promise<ClassSchedule> {
    const existing = await this.scheduleRepo.findOne({
      where: { schedule_id: id },
    });

    if (!existing) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }

    if (updateDto.instructor_id) {
      existing.instructor = { instructor_id: updateDto.instructor_id } as any;
    }
    if (updateDto.course_id) {
      existing.course = { course_id: updateDto.course_id } as any;
    }
    if (updateDto.room_id) {
      existing.room = { room_id: updateDto.room_id } as any;
    }
    // ✅ Proper null-safe handling for project_id
    if (updateDto.project_id !== undefined) {
      existing.project =
        updateDto.project_id === null
          ? null
          : ({ project_id: updateDto.project_id } as any);
    }
    // ✅ Avoid "possibly undefined" error
    if (updateDto.schedule_days?.length) {
      existing.schedule_days = updateDto.schedule_days.join(',');
    }
    if (updateDto.time_start) {
      existing.time_start = updateDto.time_start;
    }
    if (updateDto.time_end) {
      existing.time_end = updateDto.time_end;
    }

    return await this.scheduleRepo.save(existing);
  }
  async remove(id: number): Promise<{ message: string }> {
    const existing = await this.scheduleRepo.findOne({
      where: { schedule_id: id },
    });

    if (!existing) {
      throw new NotFoundException(`Schedule with ID ${id} not found.`);
    }

    await this.scheduleRepo.remove(existing);

    return { message: `Schedule with ID ${id} successfully deleted.` };
  }

  //   async findWithViewAll(): Promise<any[]> {
  //     const rawQuery = `
  // SELECT

  //     -- Offer Code
  //     CONCAT(cs.course_id, cs.section_id, cu.curriculum_id) AS offer_code,

  //     cs.schedule_id,
  //     cs.time_start,
  //     cs.time_end,
  //     cs.schedule_days,

  //     -- Course Info
  //     cs.course_id,
  //     c.course_code,
  //     c.course_description,
  //     c.course_semester,
  //     c.course_level,

  //     -- Curriculum Info
  //     cu.curriculum_id,
  //     cu.curriculum_name,

  //     -- Program Info
  //     p.program_id,
  //     p.program_name,

  //     -- Section Info
  //     s.section_id,
  //     s.section_session,
  //     s.section_set,

  //     -- Projected Info
  //     pj.project_id,
  //     pj.project_level,
  //     pj.project_section,

  //     -- Instructor Info
  //     i.instructor_id,
  //     i.instructor_fname,
  //     i.instructor_mname,
  //     i.instructor_lname,
  //     i.instructor_gender,
  //     i.instructor_jobtype,

  //     -- Room Info
  //     r.room_id,
  //     r.room_name,
  //     r.room_type

  // FROM class_scheduler.class_schedule cs
  // -- Section
  // JOIN class_scheduler.sections s
  //   ON cs.section_id = s.section_id

  // -- Projected (linked to section)
  // JOIN class_scheduler.projected pj
  //   ON s.project_id = pj.project_id

  // -- Course
  // JOIN class_scheduler.courses c
  //   ON cs.course_id = c.course_id

  // -- Curriculum (linked to course)
  // JOIN class_scheduler.curricula cu
  //   ON c.curriculum_id = cu.curriculum_id

  // -- Program (linked to curriculum)
  // JOIN class_scheduler.programs p
  //   ON cu.program_id = p.program_id

  // -- Instructor
  // JOIN class_scheduler.instructors i
  //   ON cs.instructor_id = i.instructor_id

  // -- Room
  // JOIN class_scheduler.rooms r
  //   ON cs.room_id = r.room_id

  // LIMIT 0, 2000;

  //     `;

  //     return await this.dataSource.query(rawQuery);
  //   }
  //   async findWithViewAll(): Promise<any[]> {
  //     const rawQuery = `
  // SELECT
  //     cs.schedule_id,
  //     cs.time_start,
  //     cs.time_end,
  //     cs.schedule_days,

  //     cs.course_id,
  //     c.course_code,
  //     c.course_description,
  //     c.course_semester,
  //     c.course_level,
  //     c.course_lab,
  //     c.course_lec,
  //     c.course_requisite,

  //     cu.curriculum_id,
  //     cu.curriculum_name,

  //     p.program_id,
  //     p.program_name,

  //     s.section_id,
  //     s.section_session,
  //     s.section_set,

  //     pj.project_id,
  //     pj.project_level,
  //     pj.project_section,

  //     i.instructor_id,
  //     i.instructor_fname,
  //     i.instructor_mname,
  //     i.instructor_lname,
  //     i.instructor_gender,
  //     i.instructor_jobtype,

  //     r.room_id,
  //     r.room_name,
  //     r.room_type

  // FROM class_scheduler.class_schedule cs
  // JOIN class_scheduler.sections s ON cs.section_id = s.section_id
  // JOIN class_scheduler.projected pj ON s.project_id = pj.project_id
  // JOIN class_scheduler.courses c ON cs.course_id = c.course_id
  // JOIN class_scheduler.curricula cu ON c.curriculum_id = cu.curriculum_id
  // JOIN class_scheduler.programs p ON cu.program_id = p.program_id
  // JOIN class_scheduler.instructors i ON cs.instructor_id = i.instructor_id
  // JOIN class_scheduler.rooms r ON cs.room_id = r.room_id

  // ORDER BY cs.schedule_id DESC

  // LIMIT 0, 2000;
  // `;

  //     return await this.dataSource.query(rawQuery);
  //   }

  async findWithInstructorPrograms(): Promise<any[]> {
    const rawQuery = `
     SELECT
  cs.schedule_id,
  cs.time_start,
  cs.time_end,
  cs.schedule_days,

  r.room_id,
  r.room_name,
  r.room_number,
  r.room_type,
  
  s.section_id,
  cs.course_id,

  i.instructor_id,
  i.instructor_fname,
  i.instructor_mname,
  i.instructor_lname,
  i.instructor_gender,
  i.instructor_jobtype,

  b.bachelor_category,
  b.bachelor_type,

  m.master_category,
  m.master_type,

  d.doctorate_category,
  d.doctorate_type

FROM class_scheduler.class_schedule cs
JOIN class_scheduler.instructors i
  ON cs.instructor_id = i.instructor_id
LEFT JOIN class_scheduler.bachelor b
  ON i.bachelorprogram_id = b.bachelorprogram_id
LEFT JOIN class_scheduler.master m
  ON i.masterprogram_id = m.masterprogram_id
LEFT JOIN class_scheduler.doctorate d
  ON i.doctorateprogram_id = d.doctorateprogram_id
JOIN class_scheduler.rooms r
  ON cs.room_id = r.room_id
JOIN class_scheduler.sections s
  ON cs.section_id = s.section_id
LIMIT 0, 2000;

    `;

    return await this.dataSource.query(rawQuery);
  }
  async findWithPrograms(): Promise<any[]> {
    const rawQuery = `
  
SELECT 
    cs.schedule_id,
    cs.time_start,
    cs.time_end,
    cs.schedule_days,
    cs.course_id,
    s.section_id,
    c.curriculum_id,
    p.program_id,
    p.program_name,
    p.program_code,
    p.program_major
FROM
    class_scheduler.class_schedule cs
        JOIN
    class_scheduler.sections s ON cs.section_id = s.section_id
        JOIN
    class_scheduler.courses c ON cs.course_id = c.course_id
        JOIN
    class_scheduler.curricula cu ON c.curriculum_id = cu.curriculum_id
        JOIN
    class_scheduler.programs p ON cu.program_id = p.program_id
LIMIT 0 , 2000;

    `;

    return await this.dataSource.query(rawQuery);
  }

  async findWithCourses(): Promise<any[]> {
    const rawQuery = `
  
SELECT
  -- Class Schedule Info
  cs.schedule_id,
  cs.time_start,
  cs.time_end,
  cs.schedule_days,
  cs.course_id,

  -- Section Info
  s.section_id,

  -- Course Info
  c.curriculum_id,
  c.course_code,
  c.course_description,
  c.course_semester,
  c.course_level,
  c.course_lec,
  c.course_lab,
  c.course_requisite,

  -- Curriculum Info
  cu.curriculum_name,
  cu.curriculum_since,
  cu.curriculum_effective,
  cu.curriculum_consortium,
  cu.curriculum_cmo,

  -- Program Info
  p.program_id,
  p.program_name

FROM class_scheduler.class_schedule cs
JOIN class_scheduler.sections s ON cs.section_id = s.section_id
JOIN class_scheduler.courses c ON cs.course_id = c.course_id
JOIN class_scheduler.curricula cu ON c.curriculum_id = cu.curriculum_id
JOIN class_scheduler.programs p ON cu.program_id = p.program_id

LIMIT 0, 2000;


    `;

    return await this.dataSource.query(rawQuery);
  }

  async findWithSections(): Promise<any[]> {
    const rawQuery = `
SELECT 
    cs.schedule_id,
    cs.time_start,
    cs.time_end,
    cs.schedule_days,
    cs.course_id,
    c.curriculum_id,
    pj.project_id,
    pj.project_level,
    pj.project_section,
    s.section_id,
    s.section_session,
    s.section_set,
    p.program_id
FROM
    class_scheduler.class_schedule cs
        JOIN
    class_scheduler.sections s ON cs.section_id = s.section_id
        JOIN
    class_scheduler.courses c ON cs.course_id = c.course_id
        JOIN
    class_scheduler.curricula cu ON c.curriculum_id = cu.curriculum_id
        JOIN
    class_scheduler.programs p ON cu.program_id = p.program_id
        JOIN
    class_scheduler.projected pj ON pj.project_id = pj.project_id
LIMIT 0 , 2000;
    `;

    return await this.dataSource.query(rawQuery);
  }
}
