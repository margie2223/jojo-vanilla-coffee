import type { Metadata } from "next";
import { Quicksand, Overpass } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "B2B Supplier of Natural Vanilla & Coffee | JOJO Vanilla & Coffee (U) Limited",
  description:
    "B2B Supplier of sustainable Ugandan Vanilla Beans, Coffee & Spices from Namanve, Mukono. JOJO Vanilla & Coffee (U) Limited supplies premium single-origin natural ingredients across East Africa and beyond.",
  keywords: [
    "Vanilla Beans",
    "Coffee",
    "Natural Spices",
    "Cassia Cinnamon",
    "B2B Supplier",
    "Sustainable Sourcing",
    "Ugandan Vanilla",
    "Namanve",
    "Mukono",
    "JOJO Vanilla & Coffee",
  ],
  authors: [{ name: "JOJO Vanilla & Coffee (U) Limited" }],
  icons: {
    icon: "/images/logo-jojo.jpg",
  },
  openGraph: {
    title: "B2B Supplier of Natural Vanilla & Coffee | JOJO Vanilla & Coffee (U) Limited",
    description:
      "B2B Supplier of sustainable Ugandan Vanilla Beans, Coffee & Spices from Namanve, Mukono. JOJO Vanilla & Coffee (U) Limited supplies premium single-origin natural ingredients across East Africa and beyond.",
    url: "https://jojo-vanilla-coffee.com/",
    siteName: "JOJO Vanilla & Coffee (U) Limited",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Supplier of Natural Vanilla & Coffee | JOJO Vanilla & Coffee (U) Limited",
    description:
      "B2B Supplier of sustainable Ugandan Vanilla Beans, Coffee & Spices from Namanve, Mukono. Single-origin sourcing from Uganda to East Africa and beyond.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} ${overpass.variable} antialiased bg-background text-foreground font-overpass`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
