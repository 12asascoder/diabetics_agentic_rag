"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { FlaskConical } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email, password } 
        : { name, institution, email, password };

      const res = await axios.post(endpoint, payload, {
        withCredentials: true
      });

      if (res.data && res.data._id) {
        setUser(res.data);
        router.push('/workspaces/dashboard');
      }
    } catch (err: any) {
      if (!err.response) {
        setError('Network error: The server could not be reached. If you are on Vercel, check NEXT_PUBLIC_API_URL.');
      } else if (err.response.status === 502) {
        setError('502 Bad Gateway: The backend API is unreachable or crashed on startup.');
      } else {
        setError(err.response?.data?.message || `Authentication failed (Status ${err.response.status}). Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex flex-col justify-center items-center font-sans p-6">
      
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
          <FlaskConical size={24} />
        </div>
        <h1 className="text-2xl font-heading font-bold text-primary mb-1">DiaResearch IQ</h1>
        <p className="text-secondary text-sm">Clinical Intelligence Platform</p>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl w-full max-w-md p-8">
        <h2 className="text-xl font-heading font-bold text-primary mb-6">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-label tracking-wide text-secondary uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-label tracking-wide text-secondary uppercase mb-1">Institution</label>
                <input 
                  type="text" 
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-label tracking-wide text-secondary uppercase mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-label tracking-wide text-secondary uppercase mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded font-medium text-sm hover:bg-primary/90 transition-colors mt-6 disabled:opacity-70"
          >
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Register')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }} 
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'Register here' : 'Log in here'}
          </button>
        </div>

      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-secondary hover:text-primary hover:underline transition-colors">
          &larr; Back to Platform Home
        </Link>
      </div>

    </div>
  );
}
