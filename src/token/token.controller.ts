import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create() {
    return this.tokenService.create();
  }

  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @Get()
  findOne() {
    return this.tokenService.findOne();
  }

  @Patch()
  update() {
    return this.tokenService.update();
  }

  @Delete()
  remove() {
    return this.tokenService.remove();
  }
}
