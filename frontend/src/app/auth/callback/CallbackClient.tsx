"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Store the token in a cookie on the frontend domain
      const isSecure = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
      Cookies.set("access_token", token, {
        expires: 1,
        secure: isSecure,
        sameSite: "strict",
      });
      // Redirect to the home page
      router.replace("/home");
    }
  }, [searchParams]);

  // You can render a loading spinner or a simple message here
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
