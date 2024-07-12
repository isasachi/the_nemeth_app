// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/db/prisma-client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { username, password } = authSchema.parse(credentials);

        const user = await prisma.users.findUnique({
          where: { user_name: username },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
          // Ensure the returned user object includes the 'id' field
          return {
            id: user.user_id,
            email: user.email,
            name: user.user_name,
            role: user.role,
          };
        }

        throw new Error('Wrong username or password');
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
        if (token && session.user) {
            session.user.id = token.id as string;
            }
            return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST }