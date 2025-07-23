"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import styles from "../styles/BoxStyle.module.css";
import { useEffect, useRef, useState } from "react";

function About() {
  const dotLottieRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && dotLottieRef.current) {
          dotLottieRef.current.play();
        }
      },
      { threshold: 1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section id="about" className="flex flex-col">
      <div className="flex w-full justify-between">
        <div className={styles["rounded-box"]}>
          <div className="flex items-center w-auto h-max gap-4">
            <h1 className="text-[60px] font-bold mt-5">What is</h1>
            <Image src="/logo-full.svg" alt="Notin" width={180} height={180} />
            <h1 className="text-[60px] font-bold mt-5">?</h1>
          </div>
          <p className="text-[100%] font-light opacity-50 text-justify w-120">
            NOTIN is your intelligent note-making companion — an AI-powered tool
            that transforms YouTube lectures, PDFs, and Google Docs into clear,
            structured, and easy-to-read markdown notes. Designed for students,
            educators, and lifelong learners, NOTIN helps you focus on what
            matters: understanding and learning — not manually writing notes.
            Unlike many existing tools, NOTIN is built to be completely free. No
            paywalls, no subscriptions — just pure, accessible knowledge.
          </p>
        </div>
        <div className="w-130 overflow-hidden relative">
          <DotLottieReact
            src="https://lottie.host/a97d9029-89ba-4748-9a87-cafef0182f0f/0AbzJmTKhX.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex w-full justify-between mt-[10dvh]">
        <div ref={containerRef} className="w-130 overflow-hidden relative">
          <DotLottieReact
            src="https://lottie.host/4c2c7003-1d50-4cb1-997a-f2377b9e0c3b/JOFjmUWIpr.lottie"
            loop={false}
            autoplay={false}
            dotLottieRefCallback={(instance) => {
              dotLottieRef.current = instance;
            }}
            className="w-full h-full"
          />
        </div>
        <div className={`${styles["rounded-box"]} ${styles["right"]}`}>
          <h1 className="text-[60px] font-bold mt-5">Why choose Us?</h1>
          <p className="text-[100%] font-light opacity-50 text-justify w-120">
            At NOTIN, we believe that learning should be simple, fast, and free.
            Whether you're studying for an exam, summarizing lectures, or
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
