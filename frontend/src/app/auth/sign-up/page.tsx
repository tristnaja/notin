"use client";
import LottiePlayer from "@/app/components/LottiePlayer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../lib/api/auth";
import { toast } from "sonner";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    setLoading(true);
    try {
      await registerUser(email, password, confirmPassword, username);
      toast.success("Registration successful! Please sign in.", {
        style: {
          "--normal-bg":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-text": "var(--color-white)",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
        position: "top-right",
      });
      router.push("/auth/sign-in");
    } catch (error: any) {
      toast.error(
        error.message || "Oops, there was an error processing your request.",
        {
          style: {
            "--normal-bg":
              "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
            "--normal-text": "var(--color-white)",
            "--normal-border": "transparent",
          } as React.CSSProperties,
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute bottom-0 right-0 left-0 scale-300 lg:scale-200 xl:scale-150 -translate-y-[30dvh] md:translate-y-[10dvh] opacity-70">
        <LottiePlayer mt={0} src="/auth/dots-dancing.lottie" />
      </div>
      <main className="absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center gap-6 flex-wrap mx-4">
        <Image
          src="/logo-full.svg"
          alt="Notin Logo"
          width={250}
          height={250}
          style={{ width: "clamp(1rem, 70dvw, 15rem)", height: "auto" }}
        />
        <form
          action={handleSubmit}
          className="w-max flex flex-col gap-6 py-12 px-10 bg-transparent-black backdrop-blur-lg rounded-lg border-3 border-light-grey shadow-lg"
        >
          <article className="flex flex-col gap-1">
            <label htmlFor="username" className="font-bold text-[16px]">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
              required
              className="w-[55dvw] max-w-[412px] h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
            />
          </article>
          <article className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-[16px]">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              className="w-[55dvw] max-w-[412px] h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
            />
          </article>
          <article className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold text-[16px]">
              Password:
            </label>
            <div className=" relative w-[55dvw] max-w-[412px]">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="your password"
                required
                className="w-full h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white-opacity-50 hover:text-white cursor-pointer scale-125"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </article>
          <article className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="font-bold text-[16px]">
              Confirm Password:
            </label>
            <div className=" relative w-[55dvw] max-w-[412px]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                placeholder="re-type your password"
                required
                className="w-full h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white-opacity-50 hover:text-white cursor-pointer scale-125"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </article>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue text-white rounded-lg w-[55dvw] flex justify-center items-center max-w-[412px] h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>

          <article className="flex flex-col gap-6 items-center">
            <div className="w-full h-auto flex items-center justify-between">
              <div className="h-1 bg-white-opacity-50 flex-1" />
              <p className="font-extrabold text-[20px] text-white-opacity-50 mx-4 mt-1 cursor-not-allowed">
                OR
              </p>
              <div className="h-1 bg-white-opacity-50 flex-1" />
            </div>
            <Link
              href="http://localhost:8000/auth/google/login"
              className="text-white flex bg-light-grey w-[55dvw] max-w-[412px] h-[52px] items-center justify-center gap-2 md:gap-3 rounded-lg font-bold"
              style={{ fontSize: "clamp(12px, 2.5vw, 20px)" }}
            >
              <Image
                src="/auth/google-icon.svg"
                alt="Google Icon"
                width={24}
                height={24}
                style={{ width: "clamp(1rem, 4dvw, 1.5rem)", height: "auto" }}
              />
              <p className="mt-1">Continue with Google</p>
            </Link>
            <p className="text-white text-[12px] font-light flex gap-1 justify-center items-center cursor-not-allowed">
              Already have an account?
              <Link href="/auth/sign-in" className="font-bold" replace>
                Sign In
              </Link>
            </p>
          </article>
        </form>
      </main>
    </div>
  );
}
