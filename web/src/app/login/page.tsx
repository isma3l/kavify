"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/shared/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import Link from "next/link";

type State =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success" };

async function handleForm(state: State, formdata: FormData): Promise<State> {
  try {
    const email = formdata.get("email");
    const password = formdata.get("password");
    console.log({ email, password });
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { type: "success" };
  } catch (error) {
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Unknow Error",
    };
  }
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    handleForm,
    { type: "idle" },
  );

  const hasError = state.type === "error";

  return (
    <main className="flex justify-center items-center min-h-screen p-4">
      <section
        className="bg-surface rounded-2xl p-10 w-full max-w-md shadow-lg shadow-glow"
        aria-labelledby="login-title"
      >
        <header className="text-center mb-10">
          <h1
            id="login-title"
            className="text-3xl font-medium text-text-primary mb-2"
          >
            Bienvenido
          </h1>
          <p className="text-sm text-text-secondary">
            Ingresa tus credenciales para continuar
          </p>
        </header>

        <form className="flex flex-col gap-6" action={formAction}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-secondary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              required
              autoComplete="email"
              disabled={isPending}
              aria-describedby={hasError ? "form-error" : undefined}
              className="px-4 py-3 bg-bg border border-surface-raised rounded-lg text-base text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/10 transition disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-secondary"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={isPending}
              aria-describedby={hasError ? "form-error" : undefined}
              className="px-4 py-3 bg-bg border border-surface-raised rounded-lg text-base text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/10 transition disabled:opacity-60"
            />
          </div>

          {hasError && (
            <p
              id="form-error"
              className="text-sm text-danger text-center"
              role="alert"
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="px-6 py-3.5 bg-accent text-bg font-medium rounded-lg transition hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <footer className="text-center mt-6 text-sm text-text-secondary">
          <p>
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-accent font-medium hover:text-accent-hover hover:underline"
            >
              Regístrate
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="/recover"
              className="text-accent font-medium hover:text-accent-hover hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}
