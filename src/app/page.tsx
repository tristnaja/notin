import Hero from "./components/hero";
import Navbar from "./components/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center pt-6 px-8 mb-[5%]">
        <Navbar />
      </nav>
      <main className="flex flex-col justify-center items-center">
        <Hero />
      </main>
      <footer className=""></footer>
    </div>
  );
}
