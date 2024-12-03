'use client';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCx5eIZx40lDhT6MOVBE9wUDutmC7icQvY',
  authDomain: 'almorticesz-65672.firebaseapp.com',
  projectId: 'almorticesz-65672',
  storageBucket: 'almorticesz-65672.firebasestorage.app',
  messagingSenderId: '517020091345',
  appId: '1:517020091345:web:f0635652c2fcea6dce96f0',
  measurementId: 'G-2JRYTXCRG3'
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true);
    } catch {
      setError('Failed to sign in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-6 py-12 lg:px-8">
      {isSignedIn ? (
        <div className="flex justify-center items-center w-full h-full text-xl font-bold text-green-600">
          Signed in successfully!
        </div>
      ) : (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Almorticesz"
            src="/almorticesz.jpg"
            className="mx-auto h-20 w-auto shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <form onSubmit={handleSignIn} className="mt-10 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-yellow-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-800 focus:outline-none"
              >
                Sign in
              </button>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-yellow-900 hover:text-yellow-800">
              Select your plan
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
