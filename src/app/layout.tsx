export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

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
            </body>
        </html>
    );
}
