'use client'

import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login:React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false
    })
    router.push('/dashboard')

    if (res?.error) {
      toast.error(res?.error);
    }
  };
    
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
          <form 
              className="space-y-4" 
              action={handleLogin}>
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-violet-500 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );

}

export default Login;