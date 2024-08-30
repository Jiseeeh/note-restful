import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GoogleRedirectResponse } from './repsponses/google-redirect.response';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

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

  /**
   *
   * The route to revoke the access token from Google
   */
  @Post('logout-google')
  @UseGuards(GoogleOAuthGuard)
  @ApiNoContentResponse({
    description: 'Returns when user has been successfully logged out.',
  })
  @ApiUnauthorizedResponse({
    description:
      'Returns when the user is not authenticated or the token is invalid.',
  })
  @ApiBadRequestResponse({
    description:
      'Returns when the revoking of the token failed for some reason.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Returns when an error occurred while revoking the token.',
  })
  @HttpCode(204)
  async logoutGoogle(@Req() req) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log({ token });
    return this.authService.signOut(token);
  }
}
