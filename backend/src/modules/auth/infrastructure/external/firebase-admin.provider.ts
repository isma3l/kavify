import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';

export const FIREBASE_ADMIN_APP = 'FIREBASE_ADMIN_APP';

export const firebaseAdminProvider: Provider = {
  provide: FIREBASE_ADMIN_APP,
  inject: [ConfigService],
  useFactory: (config: ConfigService): App => {
    const existingApps = getApps();
    if (existingApps.length > 0) {
      return existingApps[0];
    }

    return initializeApp({
      credential: cert({
        projectId: config.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: config
          .get<string>('FIREBASE_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n'),
      }),
    });
  },
};
