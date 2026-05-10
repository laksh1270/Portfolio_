import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Laksh Sharma | Premium Video Editor & Brand Designer",
  description:
    "Portfolio of Laksh Sharma, showcasing video editing, branding, and graphic design with ~4 years of experience.",
  icons: {
    icon: "/titan-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <head>
        </head>
        <body className={`${outfit.variable} ${inter.variable} antialiased font-sans`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
