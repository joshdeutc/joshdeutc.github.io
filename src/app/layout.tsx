import type { Metadata } from "next";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Noto_Sans_JP,
} from "next/font/google";
import "./globals.css";
import { MangaProvider } from "@/components/MangaContext";

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const fontJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joshuanancey.com"),
  title: {
    default: "Joshua Nancey — AI, LLM & Mobile Systems Engineer",
    template: "%s | Joshua Nancey",
  },
  description:
    "Interactive Manga Portfolio of Joshua Nancey (UTC Compiègne IAD & Mod'Math): Custos Android Device Owner, Grounded Clinical LLMs (CATH-LLM), Medical Vision (deep.piste GMIC/SGR), and 4D Implicit Neural Surfaces.",
  keywords: [
    "Joshua Nancey",
    "AI Engineer",
    "Machine Learning Engineer",
    "Android Kotlin Device Owner",
    "Custos",
    "LLM Evaluation",
    "Freelance Malt",
    "UTC Compiègne",
  ],
  openGraph: {
    type: "website",
    url: "https://joshuanancey.com",
    title: "Joshua Nancey — Interactive Manga Portfolio",
    description:
      "AI Research, Grounded Clinical LLMs, 4D Implicit Surfaces & Custos Android Device Owner.",
    siteName: "Joshua Nancey",
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
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} ${fontJp.variable}`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <MangaProvider>{children}</MangaProvider>
      </body>
    </html>
  );
}
