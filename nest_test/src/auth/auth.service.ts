import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  login(email: string, password: string): { success: boolean, accessToken?: string, payload?: any } {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, sub: user.name };
    const accessToken = this.jwtService.sign(payload);
    return { success: true, accessToken, payload };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(u => u.email === username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
