import NextAuth, { RequestInternal } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectmongodb from '@/db/db';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import Users from '@/Model/schema';
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

interface CredentialsType {
  email: string;
  password: string;
}
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: 'credential',
    //   async authorize(credentials: CredentialsType) {
    //     await connectmongodb().catch((error: any) => {
    //       error: 'Connection Failed';
    //     });
    //     const result = await Users.findOne({ email: credentials.email });
    //     if (!result) {
    //       throw new Error(`No user found with email ${credentials.email}`);
    //     }
    //     const CheckPassword: boolean = await compare(
    //       credentials.password,
    //       result.password
    //     );
    //     if (!CheckPassword || result.email !== credentials.email) {
    //       throw new Error(`Email and password does not match please try again`);
    //     }
    //     return result;
    //   },
    // }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(
        credentials: Record<string, string>,
        req: Pick<RequestInternal, 'headers' | 'method' | 'body' | 'query'>
      ) {
        await connectmongodb().catch((error: any) => {
          throw new Error('Connection Failed');
        });
        const user = await Users.findOne({
          email: credentials.email,
        });
        if (!user) {
          throw new Error(`No user found with email ${credentials.email}`);
        }
        const checkPassword: boolean = await compare(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          throw new Error(`Email and password does not match please try again`);
        }
        return user;
      },
    }),
  ],
});
