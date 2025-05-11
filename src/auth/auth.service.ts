import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { CrudService } from '@/base';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(userRepository);
  }

  async generatePayload(user: User) {
    const payload = {
      context: {
        id: user.id,
        role: user.role,
      },
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });

    const { password: _, ...newUser } = user;

    return { token, user: newUser };
  }

  async validateGoogleLogin(profile: {
    id: string;
    email: string;
    avatar: string;
  }) {
    let user = await this.userRepository.findOne({
      where: { googleId: profile.id },
    });
    if (!user) {
      user = this.userRepository.create({
        email: profile.email,
        googleId: profile.id,
        avatar: profile.avatar,
      });
      await this.userRepository.save(user);
    }
    return this.generatePayload(user);
  }

  async registerWithEmail(data: RegisterDto) {
    const findEmail = await this.userRepository.findOne({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (findEmail)
      throw new ConflictException('کاربر با این ایمیل از قبل وجود دارد');

    const newUser = await this.userRepository.create({
      email: data.email,
      password: data.password,
    });

    this.userRepository.save(newUser);

    return await this.generatePayload(newUser);
  }
}
