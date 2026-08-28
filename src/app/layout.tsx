import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mersomo | Premium Academic Support",
    template: "%s | Mersomo",
  },
  description:
    "Mersomo provides premium academic tutoring, essay support, dissertation guidance, and exam preparation for ambitious students at every level.",
  metadataBase: new URL("https://mersomo.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mersomo.com",
    siteName: "Mersomo",
    title: "Mersomo | Premium Academic Support",
    description:
      "Expert tutoring, essay support, and dissertation guidance — tailored to help every student reach their full potential.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mersomo | Premium Academic Support",
    description:
      "Expert tutoring, essay support, and dissertation guidance — tailored to help every student reach their full potential.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
