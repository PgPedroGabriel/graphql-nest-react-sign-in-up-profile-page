import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { NextAuthOptions } from "next-auth";
import { client } from "@/lib/apollo";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "@apollo/client";

const DO_LOGIN = gql`
  mutation DoLogin($loginUserInput: LoginUserInput!) {
    doLogin(loginUserInput: $loginUserInput) {
      accessToken
    }
  }
`;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "e-mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        try {
          const { data } = await client.mutate({
            mutation: DO_LOGIN,
            variables: {
              loginUserInput: {
                email: credentials?.email,
                password: credentials?.password,
              },
            },
          });

          const token = data.accessToken;
          return token;
        } catch (error) {
          if (error.graphQLErrors) {
            const message = error.graphQLErrors[0].details.message.join("\n");
            throw new Error(message);
          }

          throw new Error("An error occurred");
        }
      },
    }),
  ],
};

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext["req"],
  res: NextApiResponse | NextPageContext["res"]
): NextAuthOptions {
  return authOptions;
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res));
}
