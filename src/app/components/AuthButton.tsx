'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn()}>Se connecter</button>
      ) : (
        <>
          <p>Bienvenue, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Se déconnecter</button>
        </>
      )}
    </div>
  );
} 