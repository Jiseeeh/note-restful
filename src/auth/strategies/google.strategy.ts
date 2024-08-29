import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

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
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      pictureUrl: photos[0].value,
    };

    const existingUser = await this.userService.findOne(user.email);

    if (!existingUser) {
      console.log('Creating new user');
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

    console.log('User already exists');

    done(null, {
      accessToken,
    });
  }
}
