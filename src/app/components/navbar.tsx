import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <Image src="/logo-full.svg" alt="Logo" width={140} height={140} />
      <div>
        <ul className="flex gap-10 font-semibold">
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <a href="/features">Features</a>
          </li>
          <li>
            <a href="/developer">Developers</a>
          </li>
        </ul>
      </div>
      <div className="bg-red-alert w-max rounded-md cursor-pointer">
        <p className="px-6 py-2 m-0 font-bold">Sign In</p>
      </div>
    </>
  );
}

export default Navbar;
