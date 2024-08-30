import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'Your access token.',
      accessToken: req.user.accessToken,
    };
  }

  async signOut(token: string) {
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/revoke?token=${token}`,
        {
          method: 'POST',
        },
      );

      if (!response.ok) {
        throw new HttpException(
          `Failed to revoke token: ${response.statusText}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        message: 'Token revoked successfully',
      };
    } catch (error) {
      console.error({ error });

      throw new HttpException(
        'Error revoking token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
