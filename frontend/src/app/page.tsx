import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Features from "./components/Features";
import Developers from "./components/Developers";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="max-w-[1600px] mx-auto overflow-clip animate-slide-fade-in">
      <nav
        className="flex justify-between items-center mb-[5dvh] sticky top-0 z-50 bg-black filter"
        style={{
          filter: "drop-shadow(0px 5px 10px rgba(0, 3, 6, 0.8))",
        }}
      >
        <Navbar />
      </nav>
      <main className="flex flex-col gap-[20dvh] lg:gap-[20dvh]">
        <Hero />
        <About />
        <Features />
        <Developers />
      </main>
      <footer className="mt-[20dvh]">
        <Footer />
      </footer>
    </div>
  );
}
