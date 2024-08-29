import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

Injectable();
export class GoogleOAuthGuard implements CanActivate {
  private oauthClient: OAuth2Client;

  constructor() {
    this.oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException(
        'No access token present in the request.',
      );
    }

    try {
      const info = await this.oauthClient.getTokenInfo(accessToken);

      if (!info) {
        throw new UnauthorizedException('Invalid token info');
      }

      if (info.expiry_date < Date.now()) {
        throw new UnauthorizedException('Google access token expired');
      }

      request.user = {
        id: info.sub,
        email: info.email,
        expiresIn: info.expiry_date,
      };

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid Google access token');
    }
  }
}
