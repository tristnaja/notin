"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function CallbackClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Store the token in a cookie on the frontend domain
      Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'strict' });
      // Redirect to the home page
      window.location.href = '/home';
    }
  }, [searchParams]);

  // You can render a loading spinner or a simple message here
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}