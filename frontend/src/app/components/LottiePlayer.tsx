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

/**
 * A component to render Lottie animations.
 * @param src The source URL of the Lottie animation.
 * @param loop Whether the animation should loop.
 * @param autoplay Whether the animation should play automatically.
 * @param dotLottieRefCallback A callback to get the Lottie instance.
 * @param mt The margin-top for the component.
 * @param md_mt The margin-top for the component on medium screens.
 */
function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  dotLottieRefCallback = false,
  mt = 10,
  md_mt = 0,
}: Props) {
  const dotLottieRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
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
    const currentContainer = containerRef.current;
    if (currentContainer) observer.observe(currentContainer);
    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
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