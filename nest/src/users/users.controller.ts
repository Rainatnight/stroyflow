import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request as ExpressRequest } from 'express';
import { UserType } from './schemas/users.type';

type RequestWithUser = ExpressRequest & { user: UserType };

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/test')
  // @UseGuards(AuthStrictGuard)
  async test(@Req() req: RequestWithUser) {
    console.log('controller');
    const users = await this.usersService.test('1234');
    return { users };
  }
}
