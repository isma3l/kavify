import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import { FirebaseAuthGuard } from '../../auth/presentation/guards/firebase-auth.guard';
import { GetUserProfileUseCase } from '../domain/use-cases/get-user-profile.use-case';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly getUserProfileUseCase: GetUserProfileUseCase) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async me(@CurrentUser() userId: string): Promise<UserResponseDto> {
    const user = await this.getUserProfileUseCase.execute(userId);
    return UserResponseDto.fromEntity(user);
  }
}
