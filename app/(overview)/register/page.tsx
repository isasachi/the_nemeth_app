'use client'

import toast from 'react-hot-toast';
import { register } from '@/app/lib/actions';

export default function Register() {

  const handleSubmit = async (formData: FormData) => {
    const res = await register(formData)
    if (res.error) {
      toast.error(res.error)
    }
    toast.success('User registered successfully')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        <form className="space-y-4" action={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username*</label>
            <input
              type="text"
              name='username'
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
            <input
              type="email"
              name='email'
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
            <input
              type="password"
              name='password'
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              required
            />
          </div>
          <div>
           <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select 
              name="role" 
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm" 
            >
              <option value="">Choose a role</option>
              <option value="coordinator">Coordinator</option>
              <option value="board">Board</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-violet-500 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
