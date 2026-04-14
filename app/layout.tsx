import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gradients - AI Skill for Perceptual Gradients",
  description: "The missing upgrade to AI-generated gradients. Preset-first workflow, perceptual interpolation, and multi-platform support.",
  keywords: ["gradients", "AI", "design", "oklab", "oklch", "CSS", "Swift", "Flutter"],
  authors: [{ name: "BIAsia" }],
  openGraph: {
    title: "Gradients - AI Skill for Perceptual Gradients",
    description: "The missing upgrade to AI-generated gradients. Preset-first workflow, perceptual interpolation, and multi-platform support.",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
