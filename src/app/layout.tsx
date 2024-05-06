import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";

export const revalidate = 10;

export const metadata: Metadata = {
    title: "Auta-ch-reloaded",
    description: "UI/UX friendly visualization of auta-ch website.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`dark ${inter.className} relative`}>
                <NavBar />
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
