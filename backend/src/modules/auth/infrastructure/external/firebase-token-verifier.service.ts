import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import {
  TokenVerifierPort,
  DecodedAuthToken,
} from '../../domain/ports/token-verifier.port';
import { FIREBASE_ADMIN_APP } from './firebase-admin.provider';

@Injectable()
export class FirebaseTokenVerifierService implements TokenVerifierPort {
  constructor(
    @Inject(FIREBASE_ADMIN_APP)
    private readonly firebaseApp: App,
  ) {}

  async verifyToken(idToken: string): Promise<DecodedAuthToken> {
    try {
      const decoded = await getAuth(this.firebaseApp).verifyIdToken(idToken);
      return {
        uid: decoded.uid,
        email: decoded.email ?? null,
        name: (decoded.name as string) ?? null,
        phoneNumber: decoded.phone_number ?? null,
      };
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
