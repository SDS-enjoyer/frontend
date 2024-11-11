"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function NextAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: (Session & { expires: string }) | null;
}): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
