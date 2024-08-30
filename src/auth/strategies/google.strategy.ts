import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Injectable } from '@nestjs/common';

import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, email, picture } = profile;

    const user = {
      email: email,
      firstName: name.givenName,
      lastName: name.familyName,
      pictureUrl: picture,
    };

    const existingUser = await this.userService.findOne(user.email);

    if (!existingUser) {
      await this.userService.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        pictureUrl: user.pictureUrl,
      });

      done(null, {
        accessToken,
      });

      return;
    }

    done(null, {
      accessToken,
    });
  }
}
