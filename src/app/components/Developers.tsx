"use client";
import { useEffect } from "react";

function Developers() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const scrollers = document.querySelectorAll<HTMLElement>(".scroller");
      const wrapper = document.querySelector<HTMLElement>(".dev-wrapper");
      if (!scrollers || !wrapper) return;
      wrapper.setAttribute("data-animated", "true");

      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (!scrollerInner) return;

        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <section
      id="developers"
      className="flex flex-col justify-center items-center w-full"
    >
      <div className="flex flex-col justify-center items-center mb-[25px]">
        <h1 className="font-extrabold text-[80px] m-0 p-0">OUR DEVELOPERS</h1>
        <div className="border-b-5 border-white w-[38dvw]"></div>
      </div>
      <div className="dev-wrapper">
        <div className="scroller" data-direction="left" data-speed="slow">
          <ul className="scroller__inner tag-list">
            <li>Aziz</li>
            <li>Co-Founder</li>
            <li>AI/ML Specialist</li>
            <li>Back-End Developer</li>
            <li>Secondary Researcher</li>
          </ul>
        </div>
        <div className="scroller" data-direction="right" data-speed="slow">
          <ul className="scroller__inner tag-list">
            <li>Tristan</li>
            <li>Founder</li>
            <li>Project Manager</li>
            <li>Front-End Developer</li>
            <li>Main Researcher</li>
          </ul>
        </div>
        <div className="scroller" data-direction="left" data-speed="slow">
          <ul className="scroller__inner tag-list">
            <li>Aziz</li>
            <li>Co-Founder</li>
            <li>AI/ML Specialist</li>
            <li>Back-End Developer</li>
            <li>Secondary Researcher</li>
          </ul>
        </div>
        <div
          id="last-scroller"
          className="scroller"
          data-direction="right"
          data-speed="slow"
        >
          <ul className="scroller__inner tag-list">
            <li>Tristan</li>
            <li>Founder</li>
            <li>Project Manager</li>
            <li>Front-End Developer</li>
            <li>Main Researcher</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Developers;
