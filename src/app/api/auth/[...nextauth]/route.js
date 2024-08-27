import { Login } from '@/app/(auth)/Api/AuthenticationApi';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },


      },
      async authorize(credentials, req) {

        try {

          const res = await Login(credentials);
          if (res?.[0]) {
            const user = { ...res[0] };
            return user;
          } else {
            throw new Error(res[1]?.response?.data?.message || 'Login failed');
          }





        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Attach user data to the token
      if (user) {
        token.id = user.userId;
        token.userName = user.userName;
        token.fullName = user.fullName;
        token.role = user.role;
        token.accessToken = user.jwtToken; // Assuming the API returns a token
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data to the session
      session.user.id = token.id;
      session.user.userName = token.userName;
      session.user.fullName = token.fullName;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);