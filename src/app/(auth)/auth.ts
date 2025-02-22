import { compare } from 'bcrypt-ts';
import NextAuth, { type User, type Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';

import { getUser } from '@/lib/db/queries';

import { authConfig } from './auth.config';

interface ExtendedSession extends Session {
  user: User;
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    // Credentials({
    //   credentials: {},
    //   async authorize({ email, password }: any) {
    //     const users = await getUser(email);
    //     if (users.length === 0) return null;
    //     // biome-ignore lint: Forbidden non-null assertion.
    //     const passwordsMatch = await compare(password, users[0].password!);
    //     if (!passwordsMatch) return null;
    //     return users[0] as any;
    //   },
    // }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
