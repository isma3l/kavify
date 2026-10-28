import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  type TokenVerifierPort,
  TOKEN_VERIFIER_PORT,
} from '../../domain/ports/token-verifier.port';
import { FindUserByAuthUidUseCase } from '../../../users/domain/use-cases/find-user-by-auth-uid.use-case';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_VERIFIER_PORT)
    private readonly tokenVerifier: TokenVerifierPort,
    private readonly findUserByAuthUidUseCase: FindUserByAuthUidUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const idToken = this.extractToken(request);

    if (!idToken) {
      throw new UnauthorizedException('Falta el header Authorization');
    }

    const decoded = await this.tokenVerifier.verifyToken(idToken);
    const user = await this.findUserByAuthUidUseCase.execute(decoded.uid);
    request.userId = user.id;

    return true;
  }

  private extractToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return null;
    }
    return header.substring('Bearer '.length);
  }
}
