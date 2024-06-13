import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/auth.service';
import { JwtAuthGuard } from '../strategies/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() user: User): { message: string } {
    return this.usersService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProtectedResource(@Request() req) {
    return { message: 'User Profile', user: req.user };
  }
  
}
