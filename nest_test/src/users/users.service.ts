import { Injectable } from '@nestjs/common';
import { AuthService, User } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  register(user: User): { message: string } {
    const existingUser = this.authService.getUsers().find(u => u.email === user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    this.authService.addUser(user);
    console.log("bolj bn");
    return { message: 'User registered successfully'};
  }
  
}

