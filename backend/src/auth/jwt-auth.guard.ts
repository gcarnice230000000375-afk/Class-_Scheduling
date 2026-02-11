import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from './types'; // Import the custom type

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthRequest>(); // Use custom type
    const token = req.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('Not authenticated');
    }

    try {
      req.user = this.jwtService.verify(token); // Store user data in req.user
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
