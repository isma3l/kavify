# Clon de Cabify / Uber

Proyecto personal que replica el flujo básico de una app de transporte tipo Cabify o Uber: el pasajero inicia sesión, ve su ubicación en el mapa, elige origen y destino y recibe un listado de opciones de viaje con su precio.

> 🚧 **Proyecto en desarrollo.** Varias partes todavía usan datos simulados (ver [Estado actual](#estado-actual)).

## Estructura del repositorio

```
clon-cabify/
├── mobile/    App del pasajero (React Native + Expo)
├── backend/   API REST (NestJS + PostgreSQL/PostGIS)
└── web/       Panel de administración (Next.js), en fase inicial
```

## Tecnologías

### Mobile (`mobile/`)

- **React Native 0.81** con **Expo 54** (dev client + EAS) y **TypeScript**
- **Expo Router**: navegación basada en archivos, con grupos `(auth)` y `(app)`
- **Firebase Authentication** (`@react-native-firebase/auth`) con inicio de sesión de **Google** (`@react-native-google-signin/google-signin`)
- **Google Maps**:
  - `react-native-maps`: mapa con proveedor de Google
  - `react-native-maps-directions`: trazado de rutas
  - `react-native-google-places-autocomplete`: búsqueda de direcciones
  - `expo-location`: ubicación del usuario
- **React Native Reanimated 4** y **Gesture Handler**: animaciones y gestos
- **@gorhom/bottom-sheet**: hoja inferior desde la que se gestiona el viaje
- **Zustand**: estado global (ubicación, viaje y permisos)
- **TanStack React Query**: peticiones al backend
- **MMKV**: almacenamiento local
- **i18next / react-i18next**: traducciones (español e inglés)
- **react-hook-form**, **react-native-keyboard-controller**, **react-native-flash-message**

### Backend (`backend/`)

- **NestJS 11** con **TypeScript**
- **TypeORM** + **PostgreSQL** (driver `pg`)
- **PostGIS**: extensión de PostgreSQL para datos geoespaciales. Las posiciones de los conductores se guardan como columnas `geography(Point, 4326)` con índice espacial, y la búsqueda de conductores cercanos usa `ST_DWithin` y `ST_Distance`.
- **Firebase Admin SDK**: verifica los ID tokens de Firebase que envía la app
- Arquitectura hexagonal por módulos: `domain` (entidades, puertos, casos de uso), `infraestructure` (repositorios TypeORM, servicios externos) y `presentation` (controladores, guards, DTOs)

### Web (`web/`)

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4**
- **Firebase Auth** (inicio de sesión con email y contraseña)

## Funcionalidades

### App móvil

1. **Onboarding e inicio de sesión con Google** a través de Firebase Authentication.
2. **Mapa de Google** centrado en la ubicación actual del usuario (se piden permisos de ubicación).
3. **Hoja inferior (bottom sheet)** desde la que se solicita un viaje.
4. Al pulsar **"Solicitar ruta"** se abre una pantalla para introducir **origen y destino** con autocompletado de Google Places.
5. Con ambos puntos elegidos, se vuelve al mapa y se muestra el **listado de opciones de viaje** (estándar, XL, premium…) con conductor, vehículo, tiempo estimado de llegada y precio.

### Backend

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| `GET` | `/rides/quote` | Devuelve la ruta (polyline codificada, distancia, duración) y las opciones de viaje con su precio. **Por ahora responde con datos simulados.** |
| `GET` | `/drivers/nearby?lat=&lng=&category=` | Busca el conductor disponible más cercano de una categoría (`standard`, `xl`, `premium`) usando consultas PostGIS. |
| `POST` | `/auth/register` | Registra al usuario en la base de datos a partir de su token de Firebase (idempotente). |
| `GET` | `/users/me` | Devuelve el perfil del usuario autenticado. |

## Estado actual

**Hecho**

- Inicio de sesión con Google + Firebase en la app.
- Mapa con la ubicación del usuario.
- Selección de origen y destino y listado de precios.
- Búsqueda geoespacial de conductores cercanos en el backend.
- Verificación de tokens de Firebase en el backend.

**Pendiente / en progreso**

- `/rides/quote` devuelve una respuesta fija; falta calcular la ruta y el precio reales a partir del origen y el destino.
- La ruta que se dibuja en el mapa (`TripMap`) usa coordenadas fijas, no el origen y el destino que elige el usuario.
- `AuthModule` y `UsersModule` existen pero todavía no están importados en `AppModule`, así que `/auth/register` y `/users/me` aún no están expuestos.
- Pantalla de verificación por número de teléfono (solo la interfaz).
- Panel web de administración (solo la pantalla de login).
- Solicitud y seguimiento del viaje en tiempo real, app del conductor, pagos.

## Puesta en marcha

### Requisitos

- Node.js 20+
- Proyecto de Firebase con Authentication (proveedor Google) activado
- API key de Google Maps con Maps SDK, Directions API y Places API activadas
- Base de datos PostgreSQL con la extensión **PostGIS** (el backend está configurado con SSL, pensado para [Neon](https://neon.tech))
- Xcode y/o Android Studio para compilar la app

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Variables de entorno (`backend/.env`):

```env
DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
PORT=3000
```

La extensión PostGIS tiene que estar activada en la base de datos:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

> El `docker-compose.yml` levanta la imagen `postgres:16`, que no incluye PostGIS. Para usarlo en local hay que cambiarla por una imagen como `postgis/postgis:16-3.4`.

TypeORM tiene `synchronize: true`, así que las tablas se crean solas (solo para desarrollo).

### Mobile

```bash
cd mobile
npm install
npm run prebuild   # genera los proyectos nativos
npm run ios        # o: npm run android
```

La app usa código nativo (Firebase, Google Sign-In, MMKV), así que necesita un **dev client**; no funciona con Expo Go.

Variables de entorno (`mobile/.env.dev`, `.env.stage`):

```env
API_URL=
WEB_CLIENT_ID=
IOS_CLIENT_ID=
GOOGLE_MAPS_KEY=
```

Los archivos de configuración de Firebase (`google-services.json` / `GoogleService-Info.plist`) van en `mobile/firebase/<entorno>/` (por ejemplo, `mobile/firebase/dev/`).

### Web

```bash
cd web
npm install
npm run dev
```

Variables de entorno (`web/.env.local`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
