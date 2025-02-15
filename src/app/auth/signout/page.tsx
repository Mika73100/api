'use client';

import { signIn } from "next-auth/react";
import { useState } from 'react';

export default function SignOut() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Connexion après l'enregistrement
      await signIn('credentials', { email, password });
    } else {
      // Gérer les erreurs
      console.error('Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Créez votre compte
        </h2>
        <div className="mt-6 border-t pt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4" />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRegister}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          >
            S'inscrire
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="mt-6 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
          >
            S'inscrire avec Google
          </button>
          <p className="mt-4 text-center text-gray-500">
            Déjà un compte ?{" "}
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}