"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Hero() {
  return (
    <section
      id="home"
      className="max-h-screen flex flex-col justify-center items-center"
    >
      <div
        className="w-max bg-black flex gap-4 justify-center items-center border border-white px-2 py-2 pr-4 rounded-full"
        style={{
          filter: "drop-shadow(0px 9px 30px rgba(249, 252, 255, 0.2))",
        }}
      >
        <div className="bg-blue-opacity-40 w-9 h-9 rounded-full flex justify-center items-end mb-0.5">
          <p className="text-[25px] p-0 m-0 leading-none">🤖</p>
        </div>
        <p className="font-light text-[16px] pt-0.5">Smart AI Assistant</p>
      </div>

      <div className="mt-[66px] flex flex-col justify-center items-center w-max">
        <h1 className="font-extrabold text-[60px]">YOUR AI STUDY ASSISTANT</h1>
        <div className="w-200 overflow-hidden relative">
          <DotLottieReact
            src="https://lottie.host/95b7259a-f0fe-419e-9f89-c6062c74df56/FoF3DNPZsU.lottie"
            loop
            autoplay
            className="w-full h-full -mt-20"
          />
        </div>
        <div className="w-270 opacity-50 -mt-20">
          <p
            className="text-center font-light"
            style={{ fontSize: "clamp(20px, 2vw, 25px)" }}
          >
            Transform your lectures, articles, and textbooks into clear,
            well-structured, and intelligent notes with the power of AI —
            helping you learn faster, retain more, and stay organized
            effortlessly, all from the convenience of your own device.
          </p>
        </div>
      </div>
      <div className="flex gap-10 mt-12">
        <div className="bg-red-alert w-[220px] h-[70px] flex justify-center items-center rounded-full cursor-pointer">
          <p className="mt-1 font-bold text-[23px]">Dashboard</p>
        </div>
        <div className="bg-grey w-[220px] h-[70px] flex justify-center items-center rounded-full cursor-pointer">
          <p className="mt-1 font-bold text-[23px]">See More</p>
        </div>
      </div>
    </section>
  );
}
export default Hero;
