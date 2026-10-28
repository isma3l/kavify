export interface DecodedAuthToken {
  uid: string;
  email: string | null;
  name: string | null;
  phoneNumber: string | null;
}

export interface TokenVerifierPort {
  /**
   * Verifica un idToken recibido del cliente y devuelve su payload decodificado.
   */
  verifyToken(idToken: string): Promise<DecodedAuthToken>;
}

export const TOKEN_VERIFIER_PORT = 'TOKEN_VERIFIER_PORT';
