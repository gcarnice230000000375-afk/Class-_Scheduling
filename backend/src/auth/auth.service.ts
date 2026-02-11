import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { User_Accounts } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User_Accounts)
    private readonly userRepository: Repository<User_Accounts>,
  ) {}

  async findUserByEmail(email: string): Promise<User_Accounts | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.validateUser(email, password);
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.position,
      office: user.office,
      employee_id: user.employee_id,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return res.json({
      message: 'Login successful',
      role: user.role,
    });
  }

  async logout(res: Response) {
    res.clearCookie('jwt');
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  async getProfile(req: Request) {
    try {
      const token = req.cookies['jwt'];
      if (!token) {
        throw new UnauthorizedException('Not authenticated');
      }

      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: decoded.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        employee_id: user.employee_id,
        position: user.position,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // ✅ New Registration Method
  async register(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    position: string,
    office: string,
    res: Response,
  ) {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role: 'Admin',
      position: 'Admin', // or some default like 'Employee' or 'Unknown'
      office,
    });

    await this.userRepository.save(newUser);

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
      position: newUser.position,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      office: newUser.office,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return res.status(201).json({
      message: 'Registration successful',
      role: newUser.role,
    });
  }
}
