import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, emails, photos } = profile;
    const email = emails[0].value;
    const avatar = photos?.[0]?.value;

    return this.authService.validateGoogleLogin({
      id,
      email,
      avatar,
    });
  }
}
