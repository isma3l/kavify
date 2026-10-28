import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  findByAuthUid(authUid: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
