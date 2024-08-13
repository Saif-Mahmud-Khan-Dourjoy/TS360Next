import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Login Type", type: "text" },
      },
      async authorize(credentials, req) {
        const { email, password, loginType } = credentials;
        let user;
        try {
         if(loginType==="user"){

             user= { id: "1", name: "jsmith", email: email, token:"abcdef",type:loginType};
             return user;
            // const response = await fetch('http://your-spring-boot-api.com/api/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //       email: email,
            //       password: password,
            //     }),
            //   });
    
            //   const user = await response.json();
    
            //   if (response.ok && user) {
            //     // If login is successful, return the user object
            //     return user;
            //   } else {
            //     // If login fails, throw an error
            //     throw new Error(user.message || 'Login failed');
            //   }
         }else{
             user= { id: "2", name: "jsmithAdmin", email: email, token:"abcdefAdmin",type:loginType};
             return user;
            // const response = await fetch('http://your-spring-boot-api.com/api/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //       email: email,
            //       password: password,
            //     }),
            //   });
    
            //   const user = await response.json();
    
            //   if (response.ok && user) {
            //     // If login is successful, return the user object
            //     return user;
            //   } else {
            //     // If login fails, throw an error
            //     throw new Error(user.message || 'Login failed');
            //   }
            
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
        token.id = user.id;
        token.type=user.type;
        token.accessToken = user.token; // Assuming the API returns a token
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data to the session
      session.user.id = token.id;
      session.user.type = token.type;
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
