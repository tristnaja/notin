"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  dotLottieRefCallback?: boolean;
  mt?: number;
  md_mt?: number;
};

function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  dotLottieRefCallback = false,
  mt = 10,
  md_mt = 0,
}: Props) {
  const dotLottieRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && dotLottieRef.current) {
          dotLottieRef.current.stop();
          dotLottieRef.current.play();
        }
      },
      { threshold: 1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [src]);

  return (
    <div ref={containerRef} className="w-full h-full animate-fade-in">
      <DotLottieReact
        key={src}
        src={src}
        loop={loop}
        autoplay={autoplay}
        dotLottieRefCallback={
          dotLottieRefCallback
            ? (instance) => {
                dotLottieRef.current = instance;
              }
            : undefined
        }
        className={`w-full h-full -mt-${mt} md:-mt-${md_mt}`}
      />
    </div>
  );
}

export default LottiePlayer;
