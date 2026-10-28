import { Controller, Post, UseGuards, Req } from '@nestjs/common';

import { RegisterUserUseCase } from '../../users/domain/use-cases/register-user.use-case';
import {
  VerifiedTokenGuard,
  type TokenVerifiedRequest,
} from './guards/verified-token.guard';
import { UserResponseDto } from '../../users/presentation/dtos/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  /**
   * Se llama UNA vez, justo después del primer login exitoso con Firebase
   * en el cliente. Idempotente: si ya está registrado, no falla.
   */
  @Post('register')
  @UseGuards(VerifiedTokenGuard)
  async register(
    @Req() request: TokenVerifiedRequest,
  ): Promise<UserResponseDto> {
    const user = await this.registerUserUseCase.execute(request.decodedToken);
    return UserResponseDto.fromEntity(user);
  }
}
