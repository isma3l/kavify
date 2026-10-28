import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import {
  type UserRepositoryPort,
  USER_REPOSITORY,
} from '../ports/user.repository.port';

@Injectable()
export class FindUserByAuthUidUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(authUid: string): Promise<User> {
    const user = await this.userRepository.findByAuthUid(authUid);
    if (!user) {
      throw new UnauthorizedException(
        'Usuario no registrado. Completa el registro primero.',
      );
    }
    return user;
  }
}
