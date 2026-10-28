import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../guards/firebase-auth.guard';

/**
 * Devuelve el `users.id` interno del usuario autenticado.
 * Requiere que el endpoint esté protegido por FirebaseAuthGuard.
 *
 * Uso: @CurrentUser() userId: string
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.userId;
  },
);
