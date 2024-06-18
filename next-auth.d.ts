// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
  }
}
