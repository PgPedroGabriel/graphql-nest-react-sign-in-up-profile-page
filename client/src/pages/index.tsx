import {
  GetSessionParams,
  getSession,
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    signIn();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(session, null, "")}</pre>
    </main>
  );
}
