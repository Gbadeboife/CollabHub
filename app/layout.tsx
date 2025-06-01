
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { VerticalNav } from "@/components/vertical-nav"


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CollabHub- Team Collaboration Tool",
  description: "A team collaboration tool for managing tasks, projects, and communication.",
};

const quicksand = Quicksand({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (  
    <>
    <html lang="en">
      <body className={quicksand.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <VerticalNav 
            workspaceName="CollabHub"
          />
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
    </>
  );
}
