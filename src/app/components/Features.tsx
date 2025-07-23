import Image from "next/image";

function Features() {
  return (
    <section
      id="features"
      className="flex flex-col justify-center items-center w-full relative max-h-[1024px] p-0 m-0"
    >
      <Image
        src="/main-feature-decoration.svg"
        alt="Features Illustration"
        width={1000}
        height={1000}
        className="self-end justify-self-start"
      />
      <div className="h-[100dvh] bg-transparent"></div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center backdrop-blur-[1.5px]"
        style={{
          boxShadow:
            "inset 0 0 5dvh 7dvh rgba(0, 0, 0, 1), 0 0 5dvh 5dvh rgba(0, 0, 0, 1)",
        }}
      >
        <div className="cursor-pointer group flex flex-col items-center justify-center gap-4 w-[35dvw]">
          <h1 className="w-full text-center transition-all duration-300 text-[36px] text-white-opacity-50 group-hover:text-white font-semibold border-b-2 border-b-white-opacity-50 group-hover:border-b-white pb-2">
            AI-Powered Note Generation
          </h1>
          <p className="opacity-0 -mt-15 mb-0 group-hover:opacity-100 group-hover:mt-0 group-hover:mb-4 transition-all duration-300 text-[24px] font-light text-center px-4">
            Upload your files or links, and let NOTIN convert them into clear,
            organized notes.
          </p>
        </div>
        <div className="cursor-pointer group flex flex-col items-center justify-center gap-4 w-[35dvw]">
          <h1 className="w-full text-center transition-all duration-300 text-[36px] text-white-opacity-50 group-hover:text-white font-semibold border-b-2 border-b-white-opacity-50 group-hover:border-b-white pb-2">
            Easy-to-read Notes
          </h1>
          <p className="opacity-0 -mt-15 mb-0 group-hover:opacity-100 group-hover:mt-0 group-hover:mb-4 transition-all duration-300 text-[24px] font-light text-center px-4">
            Smart AI turns your sources to be your easy-to-read notes — perfect
            for digital study.
          </p>
        </div>
        <div className="cursor-pointer group flex flex-col items-center justify-center gap-4 w-[35dvw]">
          <h1 className="w-full text-center transition-all duration-300 text-[36px] text-white-opacity-50 group-hover:text-white font-semibold border-b-2 border-b-white-opacity-50 group-hover:border-b-white pb-2">
            Supports Multiple Inputs
          </h1>
          <p className="opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-[24px] font-light text-center px-4">
            YouTube videos, Google Docs, and PDFs — NOTIN can handle them all.
          </p>
        </div>
      </div>
      <Image
        src="/main-feature-decoration-2.svg"
        alt="Features Illustration"
        width={1000}
        height={1000}
        className="self-start"
      />
    </section>
  );
}
export default Features;
