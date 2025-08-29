import Link from "next/link";

/**
 * A simple page to indicate that the forgot password feature is in production.
 */
export default function ForgotPassword() {
  return (
    <div className="flex-col gap-6 absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center font-extrabold text-4xl">
      <h1>IN PRODUCTION!</h1>
      <Link
        href="/auth/sign-in"
        className="bg-blue rounded-full py-2 px-12 text-2xl font-medium pt-3"
      >
        Back!
      </Link>
    </div>
  );
}