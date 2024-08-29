import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GoogleRedirectResponse } from './repsponses/google-redirect.response';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * The route to login with Google
   */
  @Get('login-google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  /**
   *
   * The route that will run upon GoogleStrategy validation
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOkResponse({
    description: 'Returns when user has been successfully logged in.',
    type: GoogleRedirectResponse,
  })
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
