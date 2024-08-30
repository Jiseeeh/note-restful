import { ApiProperty } from '@nestjs/swagger';

export class GoogleRedirectResponse {
  @ApiProperty({
    description:
      'The message to be displayed to the user upon successful login',
  })
  message: string;
  @ApiProperty({
    description:
      'The access token for the user to be used in the future requests',
  })
  accessToken: string;
}
