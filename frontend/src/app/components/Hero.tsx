import Image from "next/image";
import styles from "../styles/Hero.module.css";
import LottiePlayer from "./LottiePlayer";
import Link from "next/link";

/**
 * The hero section of the landing page.
 */
function Hero() {
  return (
    <section
      id="home"
      className="max-h-screen flex flex-col-reverse md:flex-col justify-center items-center scroll-mt-26 select-none lg:select-auto"
    >
      <div
        className="w-max bg-black flex gap-2 md:gap-3 justify-center items-center border border-white px-2 py-2 pr-4 md:pr-5 rounded-full"
        style={{
          filter: "drop-shadow(0px 9px 30px rgba(249, 252, 255, 0.2))",
        }}
      >
        <div className="bg-blue-opacity-40 p-1 md:p-1.5 rounded-full flex justify-center items-center">
          <Image
            src="/landing/robot.png"
            alt="AI"
            width={20}
            height={20}
            className="md:w-8 md:h-auto"
          />
        </div>
        <p className="font-light text-[12px] md:text-[20px] pt-1">
          Smart AI Assistant
        </p>
      </div>

      <div className="mt-0 mb-10 md:mb-0 md:mt-[66px] flex flex-col justify-center items-center w-max">
        <h1
          className="font-extrabold"
          style={{ fontSize: "clamp(1rem, 5vw, 60px)" }}
        >
          YOUR AI STUDY ASSISTANT
        </h1>
        <div className="w-100 md:w-200 overflow-hidden relative">
          <LottiePlayer src="/landing/music-animation.lottie" md_mt={20} />
        </div>
        <div
          className={`${styles["p-media"]} w-90 md:w-170 lg:w-220 xl:w-270 opacity-50 -mt-5 -translate-y-2 md:translate-y-0 md:-mt-20`}
        >
          <p
            className="text-center font-light"
            style={{ fontSize: "clamp(12px, 2vw, 25px)" }}
          >
            Transform your lectures, articles, and textbooks into clear,
            well-structured, and intelligent notes with the power of AI —
            helping you learn faster, retain more, and stay organized
            effortlessly, all from the convenience of your own device.
          </p>
        </div>
      </div>
      <div className="hidden md:flex gap-10 mt-12">
        <Link href="/home">
          <div className="bg-red-alert hover:bg-red-indicator scale-100 hover:scale-105 transition-all duration-100 md:w-[200px] md:h-[60px] lg:w-[220px] lg:h-[70px] flex justify-center items-center rounded-full cursor-pointer">
            <p
              className="mt-1 font-bold"
              style={{ fontSize: "clamp(15px, 2vw, 23px)" }}
            >
              Dashboard
            </p>
          </div>
        </Link>
        <Link href="#about">
          <div className="bg-grey hover:bg-[#212121] scale-100 hover:scale-105 transition-all duration-100 md:w-[200px] md:h-[60px] lg:w-[220px] lg:h-[70px] flex justify-center items-center rounded-full cursor-pointer">
            <p
              className="mt-1 font-bold"
              style={{ fontSize: "clamp(15px, 2vw, 23px)" }}
            >
              See More
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
export default Hero;