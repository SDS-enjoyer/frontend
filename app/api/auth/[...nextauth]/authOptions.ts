import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "../userLogin";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await userLogIn(credentials.email, credentials.password);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        _id: token._id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        token: token.token as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};






// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import userLogIn from "../userLogin";

// export const authOptions: AuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//                 if (!credentials) {
//                     return null;
//                 }
//                 const user = await userLogIn(credentials.email, credentials.password);
//                 if (user) {
//                     return user;
//                 } else {
//                     return null;
//                 }
//             }
//         })
//     ],
//     session: { strategy: "jwt" },
//     callbacks: {
//         async jwt({ token, user }) {
//             return { ...token, ...user };
//         },
//         async session({ session, token }) {
//             session.user = token as any;
//             return session;
//         }
//     }
// };