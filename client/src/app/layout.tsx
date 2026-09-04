import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "उन्नति पोर्टल | Unnati Portal - Govt. of Jharkhand",
  description: "Jharkhand Quadruple Helix Innovation Platform - Dept. of Higher & Technical Education, Govt. of Jharkhand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body 
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 text-slate-800 font-sans antialiased flex flex-col justify-between"
        suppressHydrationWarning
      >
        <DemoProvider>
          <HeaderNav />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
