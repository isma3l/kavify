import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserOrmEntity } from './user.orm-entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findByAuthUid(authUid: string): Promise<User | null> {
    const found = await this.repo.findOne({ where: { authUid } });
    return found ? this.toDomain(found) : null;
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async save(user: User): Promise<User> {
    const ormEntity = this.toOrm(user);
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  private toDomain(orm: UserOrmEntity): User {
    return new User(
      orm.id,
      orm.authUid,
      orm.name,
      orm.email,
      orm.phone,
      orm.createdAt,
    );
  }

  private toOrm(user: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = user.id;
    orm.authUid = user.authUid;
    orm.name = user.name;
    orm.email = user.email;
    orm.phone = user.phone;
    return orm;
  }
}
