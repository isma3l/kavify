import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import {
  type UserRepositoryPort,
  USER_REPOSITORY,
} from '../ports/user.repository.port';
import { DecodedAuthToken } from '../../../auth/domain/ports/token-verifier.port';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(decoded: DecodedAuthToken): Promise<User> {
    const existing = await this.userRepository.findByAuthUid(decoded.uid);
    if (existing) {
      return existing;
    }

    const newUser = User.createNew({
      id: randomUUID(),
      authUid: decoded.uid,
      name: decoded.name ?? 'Usuario',
      email: decoded.email,
      phone: decoded.phoneNumber,
    });

    return this.userRepository.save(newUser);
  }
}
