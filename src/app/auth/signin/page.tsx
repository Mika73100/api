'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Erreur de connexion:", result.error);
    } else {
      router.push("/auth/signout");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Connectez-vous
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Accédez à votre compte en un clic !
        </p>

        <div className="mt-6 border-t pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? (
                  <span role="img" aria-label="Hide password">👁️</span>
                ) : (
                  <span role="img" aria-label="Show password">👁️‍🗨️</span>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Se connecter
            </button>

            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="mt-6 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
            >
              <span className="text-white font-medium">Se connecter avec Google</span>
            </button>

            <p className="mt-4 text-center text-gray-500">
              Pas de compte ?{" "}
              <a href="/auth/signout" className="text-blue-600 hover:underline">
                Créez votre compte
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
