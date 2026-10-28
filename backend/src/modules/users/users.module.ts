import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { USER_REPOSITORY } from './domain/ports/user.repository.port';
import { RegisterUserUseCase } from './domain/use-cases/register-user.use-case';
import { FindUserByAuthUidUseCase } from './domain/use-cases/find-user-by-auth-uid.use-case';
import { GetUserProfileUseCase } from './domain/use-cases/get-user-profile.use-case';
import { UsersController } from './presentation/users.controller';
import { UserOrmEntity } from './infraestructure/persistence/user.orm-entity';
import { TypeOrmUserRepository } from './infraestructure/persistence/typeorm-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    RegisterUserUseCase,
    FindUserByAuthUidUseCase,
    GetUserProfileUseCase,
  ],
  exports: [RegisterUserUseCase, FindUserByAuthUidUseCase],
})
export class UsersModule {}
