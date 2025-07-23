import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full max-h-[541px] flex flex-col bg-grey relative overflow-hidden">
      <div className="flex items-start justify-between px-12 pt-10 mb-10">
        <div>
          <h1 className="text-[32px] font-bold">CREATOR</h1>
          <p className="text-[20px] font-light">
            Tristan Al Harrish Basori - tristan.alhabas@gmail.com
          </p>
          <p className="text-[20px] font-light">
            Abdul Aziz - abdulaziz.businessmail@gmail.com
          </p>
        </div>

        <div className="flex gap-20 justify-between items-start">
          <div>
            <h1 className="font-semibold text-[21px] mb-6">Quick Links</h1>
            <ul className="flex flex-col font-light text-[20px] gap-6">
              <li>
                <Link href="#home">Home</Link>
              </li>
              <li>
                <Link href="#about">About</Link>
              </li>
              <li>
                <Link href="#features">Features</Link>
              </li>
              <li>
                <Link href="#developers">Developers</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-semibold text-[21px] mb-6">Pages</h1>
            <ul className="flex flex-col font-light text-[20px] gap-6">
              <li>
                <Link href="#home">Dashboard</Link>
              </li>
              <li>
                <Link href="#about">Documentation</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-auto">
        <Image
          src="/notin-footer.svg"
          alt="Footer Decoration"
          objectFit="contain"
          width={2000}
          height={2000}
          className="self-end justify-self-start"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-grey h-[10dvh] border-t-4 border-grey-opacity-40 flex justify-between items-center px-12">
        <p>2025 @ NOTIN. All rights reserved.</p>
        <div className="flex gap-2">
          <Image
            src="/github-icon.svg"
            alt="Icon GitHub"
            width={40}
            height={40}
          />
          <Image
            src="/email-icon.svg"
            alt="Icon Email"
            width={40}
            height={40}
          />
        </div>
        <Image src="/logo-short.svg" alt="NOTIN Logo" width={60} height={60} />
      </div>
    </div>
  );
}

export default Footer;
