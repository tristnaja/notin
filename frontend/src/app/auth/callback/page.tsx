"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Store the token in a cookie on the frontend domain
      Cookies.set("access_token", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      // Redirect to the home page
      window.location.href = "/home";
    }
  }, [searchParams, router]);

  return (
    <>
      <p>Authenticating...</p>
    </>
  ); // Or a spinner component
}
