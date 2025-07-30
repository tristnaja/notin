import LottiePlayer from "@/app/components/LottiePlayer";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute bottom-0 right-0 left-0 scale-300 lg:scale-200 xl:scale-150 -translate-y-[30dvh] md:translate-y-[10dvh] opacity-70">
        <LottiePlayer
          mt={0}
          src="https://lottie.host/65a8ee85-c68f-4413-9f2a-b40412d15707/NeuLcBdP71.lottie"
        />
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
          action="post"
          className="w-max flex flex-col gap-6 py-12 px-10 bg-transparent-black backdrop-blur-lg rounded-lg border-3 border-light-grey shadow-lg"
        >
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
            <input
              type="password"
              id="password"
              name="password"
              placeholder="your password"
              required
              className="w-[55dvw] max-w-[412px] h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
            />
            <Link
              href="/auth/forgot-password"
              className="text-white-opacity-50 text-[12px] font-light self-end mt-1"
            >
              Forgot password?
            </Link>
          </article>
          <button
            type="submit"
            className="bg-blue text-white rounded-lg w-[55dvw] max-w-[412px] h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
          >
            Sign In
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
              href="/auth/sign-up"
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
              Don't have an account?
              <Link href="/auth/sign-up" className="font-bold" replace>
                Sign Up
              </Link>
            </p>
          </article>
        </form>
      </main>
    </div>
  );
}
