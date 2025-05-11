import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  emailRegister(@Body() body: RegisterDto) {
    return this.authService.registerWithEmail(body);
  }

  @Get('google')
  @Public()
  async googleAuth() {}

  @Get('google/callback')
  @Public()
  async googleAuthRedirect(@Req() req) {
    return req.user;
  }
}
