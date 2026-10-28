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
  DecodedAuthToken,
} from '../../domain/ports/token-verifier.port';

export interface TokenVerifiedRequest extends Request {
  decodedToken: DecodedAuthToken;
}

/**
 * A diferencia de FirebaseAuthGuard, este guard NO exige que el usuario
 * ya exista en la base de datos — solo confirma que el token es válido.
 * Uso exclusivo: el endpoint de registro (POST /auth/register), donde
 * el usuario todavía no existe la primera vez que se llama.
 */
@Injectable()
export class VerifiedTokenGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_VERIFIER_PORT)
    private readonly tokenVerifier: TokenVerifierPort,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<TokenVerifiedRequest>();
    const idToken = this.extractToken(request);

    if (!idToken) {
      throw new UnauthorizedException('Falta el header Authorization');
    }

    request.decodedToken = await this.tokenVerifier.verifyToken(idToken);
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
