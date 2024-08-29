import { Injectable } from '@nestjs/common';

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

  async signOut(token: string): Promise<void> {
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/revoke?token=${token}`,
        {
          method: 'POST',
        },
      );

      if (!response.ok) {
        throw new Error(`failed to revoke token: ${response.statusText}`);
      }

      console.log('token revoked successfully');
    } catch (error) {
      console.error('error revoking token:', error);
    }
  }
}
