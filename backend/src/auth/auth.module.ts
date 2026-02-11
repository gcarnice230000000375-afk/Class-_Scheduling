import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Accounts } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User_Accounts]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Use env for security
      signOptions: { expiresIn: '1d' }, // Token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // No need to manually add JwtService
  exports: [AuthService], // Export AuthService if used in other modules
})
export class AuthModule {}
