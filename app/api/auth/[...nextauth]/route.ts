import { NextResponse } from "next/server";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const runtime = "nodejs";

// ponytail: in-memory rate limiting per server instance; upgrade to Redis-backed limiter if you run multiple instances.
const buckets = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LIMIT_GET = 120;
const LIMIT_POST = 60;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function getIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";

  const ip = (req as { ip?: string }).ip;
  return ip ?? "unknown";
}

type RouteHandler = (req: Request, context: unknown) => Promise<Response>;

function rateLimit(handler: RouteHandler, limit: number): RouteHandler {
  return async (req: Request, _context: unknown) => {
    const now = Date.now();
    const url = new URL(req.url);
    const ip = getIp(req);
    const key = `${ip}:${req.method}:${url.pathname}`;

    const existing = buckets.get(key);
    const bucket =
      existing && existing.resetAt > now
        ? existing
        : { count: 0, resetAt: now + WINDOW_MS };

    bucket.count += 1;
    buckets.set(key, bucket);

    if (bucket.count > limit) {
      const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return handler(req, _context);
  };
}

type TokenWithGoogleSub = {
  googleSub?: string;
} & Record<string, unknown>;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Host-next-auth.csrf-token"
          : "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, profile }) {
      const p = profile as Record<string, unknown> | undefined;
      const sub = typeof p?.sub === "string" ? p.sub : undefined;
      const id = typeof p?.id === "string" ? p.id : undefined;
      const googleSub = sub ?? id;

      if (googleSub) {
        (token as TokenWithGoogleSub).googleSub = googleSub;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const googleSub = (token as TokenWithGoogleSub).googleSub ?? token.sub;

        (
          session.user as typeof session.user & { googleSub?: string }
        ).googleSub = googleSub;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions) as unknown as RouteHandler;

export const GET = rateLimit(handler, LIMIT_GET);
export const POST = rateLimit(handler, LIMIT_POST);
