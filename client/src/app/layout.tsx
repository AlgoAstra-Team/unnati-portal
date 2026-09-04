import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "उन्नति पोर्टल | Unnati Portal",
  description: "Jharkhand Quadruple Helix Innovation Platform - SIH 26043",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 text-slate-800 font-sans antialiased flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
