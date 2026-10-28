import { User } from '../../domain/entities/user.entity';

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string | null;
  phone!: string | null;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.phone = user.phone;
    return dto;
  }
}
