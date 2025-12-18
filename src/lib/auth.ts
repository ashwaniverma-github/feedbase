import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;

                // Fetch subscription status from database
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                }) as any;

                session.user.subscriptionStatus = dbUser?.dodoSubscriptionStatus || null;
                session.user.planCadence = dbUser?.dodoPlanCadence || null;
            }
            return session;
        },
    },
});
