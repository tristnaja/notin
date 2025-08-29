import type { Metadata } from "next";
import { Khula } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Toaster } from "sonner";

const khula = Khula({
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-khula",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notin",
  description: "AI-Powered Note Generator",
};

/**
 * The root layout for the application.
 * @param children The children to render.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" className="scroll-smooth">
      <body className={`${khula.variable} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}