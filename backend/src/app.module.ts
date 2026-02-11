import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { InstructorsModule } from './instructors/instructors.module';
import { CoursesModule } from './courses/courses.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { ProgramsModule } from './programs/programs.module';
import { SectionsModule } from './sections/sections.module';
import { RoomsModule } from './rooms/rooms.module';
import { TimeModule } from './time/time.module';
import { ClassSchedulesModule } from './class-schedules/class-schedules.module';
import { ProjectedModule } from './projected/projected.module';
import { BachelorModule } from './bachelor/bachelor.module';
import { MasterModule } from './master/master.module';
import { DoctorateModule } from './doctorate/doctorate.module';
import { SemesterSettingsModule } from './semester-settings/semester-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // loads .env and makes process.env available
    }),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    InstructorsModule,
    CoursesModule,
    CurriculumModule,
    ProgramsModule,
    SectionsModule,
    RoomsModule,
    TimeModule,
    ClassSchedulesModule,
    ProjectedModule,
    BachelorModule,
    MasterModule,
    DoctorateModule,
    SemesterSettingsModule,
  ],
})
export class AppModule {}
