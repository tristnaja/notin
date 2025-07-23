import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";

export default function LandingPage() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <nav className="flex justify-between items-center py-6 px-8 mb-[5dvh] sticky top-0 z-50 bg-black">
        <Navbar />
      </nav>
      <main className="flex flex-col gap-[20dvh]">
        <Hero />
        <About />
      </main>
      <footer className=""></footer>
    </div>
  );
}
