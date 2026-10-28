import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import {
  type UserRepositoryPort,
  USER_REPOSITORY,
} from '../ports/user.repository.port';

@Injectable()
export class GetUserProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
