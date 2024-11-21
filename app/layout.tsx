import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider";
import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ML Algo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
            </ThemeProvider>
          </QueryProvider>
          <Toaster />
          <Sonner />
        </NextAuthProvider>
      </body>
    </html>
  );
}
