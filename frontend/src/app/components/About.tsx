import Image from "next/image";
import styles from "../styles/BoxStyle.module.css";
import LottiePlayer from "./LottiePlayer";

function About() {
  return (
    <section
      id="about"
      className="flex flex-col scroll-mt-26 select-none lg:select-auto"
    >
      <div className="flex flex-col-reverse lg:flex-row w-full justify-between gap-6 lg:gap-0">
        <div className={`w-full lg:w-auto ${styles["rounded-box"]}`}>
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center w-max h-max gap-4">
              <h1
                className="font-bold mt-5"
                style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
              >
                What is
              </h1>
              <Image
                src="/logo-full.svg"
                alt="Notin"
                width={170}
                height={170}
                className="w-37 h-auto xl:w-max"
              />
              <h1
                className="font-bold mt-5"
                style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
              >
                ?
              </h1>
            </div>
            <p
              className="font-light opacity-50 text-center lg:text-justify w-85 md:w-130 lg:w-95 xl:w-120"
              style={{ fontSize: "clamp(12px, 1vw, 1rem)" }}
            >
              NOTIN is your intelligent note-making companion — an AI-powered
              tool that transforms YouTube lectures, PDFs, and Google Docs into
              clear, structured, and easy-to-read markdown notes. Designed for
              students, educators, and lifelong learners, NOTIN helps you focus
              on what matters: understanding and learning — not manually writing
              notes. Unlike many existing tools, NOTIN is built to be completely
              free. No paywalls, no subscriptions — just pure, accessible
              knowledge.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-90 xl:w-130 overflow-hidden relative">
          <LottiePlayer src="/landing/learning-animation.lottie" mt={0} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between mt-[10dvh] w-full">
        <div className="w-full lg:w-180 xl:w-200 overflow-hidden relative">
          <LottiePlayer
            src="/landing/money-animation.lottie"
            loop={false}
            autoplay={false}
            dotLottieRefCallback={true}
            mt={0}
          />
        </div>
        <div className={`${styles["rounded-box"]} ${styles["right"]}`}>
          <h1
            className="text-center lg:text-left font-bold mt-0 lg:mt-5"
            style={{ fontSize: "clamp(30px, 4vw, 60px)" }}
          >
            Why choose Us?
          </h1>
          <p
            className="font-light opacity-50 text-center lg:text-justify w-85 md:w-130 lg:w-95 xl:w-120"
            style={{ fontSize: "clamp(12px, 1vw, 1rem)" }}
          >
            At NOTIN, we believe that learning should be simple, fast, and free.
            Whether you&apos;re studying for an exam, summarizing lectures, or
            organizing reading materials, NOTIN streamlines the process using
            the power of AI. By processing your YouTube links, PDFs, or Google
            Docs, NOTIN automatically generates clean, structured markdown notes
            — ready to use, share, and review.
          </p>
        </div>
      </div>
    </section>
  );
}
export default About;
