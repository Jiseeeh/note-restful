import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    
    req.user = {
      email: 'nr-testjc@test.com',
      firstName: 'Cat',
      lastName: 'Sheeesh',
      pictureUrl: 'http://example.com/picture.jpg',
    };

    return true;
  }
}
