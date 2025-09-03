import { Suspense } from 'react';
import CallbackClient from './CallbackClient';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    }>
      <CallbackClient />
    </Suspense>
  );
}
