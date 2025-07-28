import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <section
      id="footer"
      className="w-full max-h-[541px] flex flex-col bg-grey relative overflow-hidden select-none lg:select-auto"
    >
      <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row items-center lg:items-start justify-between px-12 pt-10 mb-14 lg:mb-10">
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
          <h1 className="text-[22px] lg:text-[32px] font-bold">CREATOR</h1>
          <p className="text-[12px] lg:text-[20px] font-light">
            Tristan Al Harrish Basori - tristan.alhabas@gmail.com
          </p>
          <p className="text-[12px] lg:text-[20px] font-light">
            Abdul Aziz - abdulaziz.businessmail@gmail.com
          </p>
        </div>

        <div className="flex gap-20 justify-between items-start">
          <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
            <h1 className="font-semibold text-[13px] lg:text-[21px] mb-6">
              Quick Links
            </h1>
            <ul className="flex flex-row justify-center lg:justify-start items-center lg:items-start flex-wrap lg:flex-nowrap lg:flex-col font-light text-[12px] lg:text-[20px] gap-6">
              <li className="scale-100 hover:scale-105 hover:text-white-opacity-50 transition-all duration-200">
                <Link href="#home">Home</Link>
              </li>
              <li className="scale-100 hover:scale-105 hover:text-white-opacity-50 transition-all duration-200">
                <Link href="#about">About</Link>
              </li>
              <li className="scale-100 hover:scale-105 hover:text-white-opacity-50 transition-all duration-200">
                <Link href="#features">Features</Link>
              </li>
              <li className="scale-100 hover:scale-105 hover:text-white-opacity-50 transition-all duration-200">
                <Link href="#developers">Developers</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
            <h1 className="font-semibold text-[13px] lg:text-[21px] mb-6">
              Pages
            </h1>
            <ul className="flex flex-row justify-center lg:justify-start items-center lg:items-start flex-wrap lg:flex-nowrap lg:flex-col font-light text-[12px] lg:text-[20px] gap-6">
              <li className="scale-100 hover:scale-105 hover:text-white-opacity-50 transition-all duration-200">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="scale-100 hover:scale-105 hover:text-white-opacity-50 transition-all duration-200">
                <Link href="/documentation">Documentation</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-auto">
        <Image
          src="/landing/notin-footer.svg"
          alt="Footer Decoration"
          width={2000}
          height={2000}
          className="self-end justify-self-start"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-grey h-[10dvh] border-t-4 border-grey-opacity-40 flex justify-between items-center px-4 md:px-8 lg:px-12">
        <p className="w-100 h-auto flex justify-start items-center text-[6px] md:text-[12px] lg:text-[1rem] cursor-not-allowed">
          2025 @ NOTIN. All rights reserved.
        </p>
        <div className="flex gap-2 w-100 h-auto justify-center items-center">
          <Link href="https://github.com/tristanaja" target="_blank">
            <Image
              src="/landing/github-icon.svg"
              alt="Icon GitHub"
              width={40}
              height={40}
              className="scale-100 hover:scale-110 transition-transform duration-200 w-6 h-6 md:w-10 md:h-10"
            />
          </Link>
          <Link href="mailto:tristan.alhabas@gmail.com" target="_blank">
            <Image
              src="/landing/email-icon.svg"
              alt="Icon Email"
              width={40}
              height={40}
              className="scale-100 hover:scale-110 transition-transform duration-200 w-6 h-6 md:w-10 md:h-10"
            />
          </Link>
        </div>
        <div className="w-100 h-auto flex justify-end items-center">
          <Link href="/">
            <Image
              src="/logo-short.svg"
              alt="NOTIN Logo"
              width={60}
              height={60}
              className="w-8 h-8 md:w-12 md:h-12"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Footer;
