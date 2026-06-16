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
  title: "B2B Supplier of Natural Vanilla & Coffee | JOJO VANILLA & COFFEE (U) LIMITED",
  description:
    "B2B Supplier of sustainable ingredients like Vanilla Beans, Coffee & Spices from Indonesia, Madagascar and Uganda. JOJO VANILLA & COFFEE (U) LIMITED ensures a transparent supply chain for professionals.",
  keywords: [
    "Vanilla Beans",
    "Coffee",
    "Natural Spices",
    "Cassia Cinnamon",
    "B2B Supplier",
    "Sustainable Sourcing",
    "Madagascar Vanilla",
    "Indonesia Spices",
    "Uganda Vanilla",
    "JOJO VANILLA & COFFEE",
  ],
  authors: [{ name: "JOJO VANILLA & COFFEE (U) LIMITED" }],
  icons: {
    icon: "/images/logo-jojo.jpg",
  },
  openGraph: {
    title: "B2B Supplier of Natural Vanilla & Coffee | JOJO VANILLA & COFFEE (U) LIMITED",
    description:
      "B2B Supplier of sustainable ingredients like Vanilla Beans, Coffee & Spices from Indonesia, Madagascar and Uganda. JOJO VANILLA & COFFEE (U) LIMITED ensures a transparent supply chain for professionals.",
    url: "https://jojo-vanilla-coffee.com/",
    siteName: "JOJO VANILLA & COFFEE (U) LIMITED",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Supplier of Natural Vanilla & Coffee | JOJO VANILLA & COFFEE (U) LIMITED",
    description:
      "B2B Supplier of sustainable ingredients like Vanilla Beans, Coffee & Spices from Indonesia, Madagascar and Uganda.",
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
