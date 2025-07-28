import Image from "next/image";

function Features() {
  return (
    <section
      id="features"
      className="flex flex-col justify-center items-center w-full relative max-h-[1024px] p-0 my-50 lg:m-0 scroll-mt-90 lg:-scroll-mt-10 select-none lg:select-auto"
    >
      <Image
        src="/main-feature-decoration.svg"
        alt="Features Illustration"
        width={1000}
        height={1000}
        className="w-max h-max hidden lg:block self-end justify-self-start"
      />
      <div className="hidden lg:block h-[100dvh] bg-transparent"></div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-8 lg:gap-8 2xl:gap-15 items-center justify-center backdrop-blur-[1.5px]"
        style={{
          boxShadow:
            "inset 0 0 5dvh 7dvh rgba(0, 0, 0, 1), 0 0 5dvh 5dvh rgba(0, 0, 0, 1)",
        }}
      >
        <div className="lg:hidden flex flex-col justify-center items-center mb-8">
          <h1 className="font-extrabold text-[35px] lg:text-[80px] m-0 p-0 select-none lg:select-auto">
            MAIN FEATURES
          </h1>
          <div className="border-b-5 border-white w-[38dvw]"></div>
        </div>
        <div className="cursor-pointer group flex flex-col items-center justify-center gap-4 w-[70dvw] md:w-[50dvw] lg:w-[40dvw]">
          <h1 className="w-full text-center transition-all duration-300 text-[20px] md:text-[26px] xl:text-[36px] text-white-opacity-50 group-hover:text-white font-semibold border-b-2 border-b-white-opacity-50 group-hover:border-b-white pb-2 select-none lg:select-auto">
            AI-Powered Note Generation
          </h1>
          <p className="opacity-0 -mt-15 mb-0 group-hover:opacity-100 group-hover:mt-0 group-hover:mb-4 transition-all duration-300 text-[12px] md:text-[18px] xl:text-[24px] font-light text-center px-4 select-none lg:select-auto">
            Upload your files or links, and let NOTIN convert them into clear,
            organized notes.
          </p>
        </div>
        <div className="cursor-pointer group flex flex-col items-center justify-center gap-4 w-[70dvw] md:w-[50dvw] lg:w-[40dvw]">
          <h1 className="w-full text-center transition-all duration-300 text-[20px] md:text-[26px] xl:text-[36px] text-white-opacity-50 group-hover:text-white font-semibold border-b-2 border-b-white-opacity-50 group-hover:border-b-white pb-2 select-none lg:select-auto">
            Easy-to-read Notes
          </h1>
          <p className="opacity-0 -mt-15 mb-0 group-hover:opacity-100 group-hover:mt-0 group-hover:mb-4 transition-all duration-300 text-[12px] md:text-[18px] xl:text-[24px] font-light text-center px-4 select-none lg:select-auto">
            Smart AI turns your sources to be your easy-to-read notes — perfect
            for digital study.
          </p>
        </div>
        <div className="cursor-pointer group flex flex-col items-center justify-center gap-4 w-[70dvw] md:w-[50dvw] lg:w-[40dvw]">
          <h1 className="w-full text-center transition-all duration-300 text-[20px] md:text-[26px] xl:text-[36px] text-white-opacity-50 group-hover:text-white font-semibold border-b-2 border-b-white-opacity-50 group-hover:border-b-white pb-2 select-none lg:select-auto">
            Supports Multiple Inputs
          </h1>
          <p className="opacity-0 -mt-15 mb-0 group-hover:opacity-100 group-hover:mt-0 group-hover:mb-4 transition-all duration-300 text-[12px] md:text-[18px] xl:text-[24px] font-light text-center px-4 select-none lg:select-auto">
            YouTube videos, Google Docs, and PDFs — NOTIN can handle them all.
          </p>
        </div>
      </div>
      <Image
        src="/main-feature-decoration-2.svg"
        alt="Features Illustration"
        width={1000}
        height={1000}
        className="w-max h-max hidden lg:block self-start"
      />
    </section>
  );
}
export default Features;
