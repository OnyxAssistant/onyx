import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@/api/auth/auth.guard';
import { User } from '@/decorators/user.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getProfile(@User() user: any) {
    return this.userService.getProfile(user.id);
  }
  
  @Patch('/')
  async updateProfile(@User() user: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(user.id, updateUserDto);
  }
}
