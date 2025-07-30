"use client";

import Sidebar from "./components/Sidebar";
import { loremIpsum } from "./constants/Lorem";

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen w-screen bg-black">
      <aside className="min-w-max w-[15dvw] max-w-max justify-self-start items-center bg-grey p-6 sticky top-0 max-h-[100dvh] transition-all duration-300">
        <Sidebar />
      </aside>
      <main className="p-23 flex-1">
        <h1 className="font-extrabold text-[48px]">Title</h1>
        <p className="font-normal text-[24px]">{loremIpsum}</p>
      </main>
    </div>
  );
}
