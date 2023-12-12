import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    signIn: async ({user, account, profile}) => {
      // Example callback to handle user sign-in
      return true;
    },
    redirect: ({url, baseUrl}): Promise<string> => {
      // Example callback to customize redirect behavior
      return Promise.resolve(baseUrl);
    },
    session: ({session, user}) => {
      // Example callback to add custom data to the session
      return session;
    },
  },
  // Add other configurations as needed
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
