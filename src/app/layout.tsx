import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { ConditionalLayoutWrapper } from "@/components/navigation/ConditionalLayoutWrapper";

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
    default: "Harnes 24/7 | Premium Academic Support",
    template: "%s | Harnes 24/7",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  description:
    "Harnes 24/7 provides premium academic tutoring, essay support, dissertation guidance, and exam preparation for ambitious students at every level.",
  metadataBase: new URL("https://harnes247.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harnes247.com",
    siteName: "Harnes 24/7",
    title: "Harnes 24/7 | Premium Academic Support",
    description:
      "Expert tutoring, essay support, and dissertation guidance — tailored to help every student reach their full potential.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harnes 24/7 | Premium Academic Support",
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
        <ConditionalLayoutWrapper
          navbar={<Navbar />}
          footer={<Footer />}
          chatLauncher={<ChatLauncher />}
        >
          {children}
        </ConditionalLayoutWrapper>
      </body>
    </html>
  );
}
