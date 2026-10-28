import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { firebaseAdminProvider } from './infrastructure/external/firebase-admin.provider';
import { FirebaseTokenVerifierService } from './infrastructure/external/firebase-token-verifier.service';
import { TOKEN_VERIFIER_PORT } from './domain/ports/token-verifier.port';
import { FirebaseAuthGuard } from './presentation/guards/firebase-auth.guard';
import { VerifiedTokenGuard } from './presentation/guards/verified-token.guard';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [ConfigModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [
    firebaseAdminProvider,
    {
      provide: TOKEN_VERIFIER_PORT,
      useClass: FirebaseTokenVerifierService,
    },
    FirebaseAuthGuard,
    VerifiedTokenGuard,
  ],
  exports: [FirebaseAuthGuard, VerifiedTokenGuard],
})
export class AuthModule {}
