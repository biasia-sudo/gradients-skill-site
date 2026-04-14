import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gradients - AI Skill for Perceptual Gradients",
  description: "Give your agent a real gradient vocabulary. Preset-first workflow, perceptual interpolation, and multi-platform support.",
  keywords: ["gradients", "AI", "design", "oklab", "oklch", "CSS", "Swift", "Flutter"],
  authors: [{ name: "BIAsia" }],
  openGraph: {
    title: "Gradients - AI Skill for Perceptual Gradients",
    description: "Give your agent a real gradient vocabulary. Preset-first workflow, perceptual interpolation, and multi-platform support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
