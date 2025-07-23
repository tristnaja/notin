import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center pt-6 px-8">
        <Navbar />
      </nav>
      <main className=""></main>
      <footer className=""></footer>
    </div>
  );
}
