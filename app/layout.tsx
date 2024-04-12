import type { Metadata } from "next";
import { Inter, Special_Elite, Poiret_One, Advent_Pro, M_PLUS_Rounded_1c, M_PLUS_1_Code } from "next/font/google";
import "./globals.css";

const elite = M_PLUS_1_Code({ subsets: ["latin"], weight: ['300', "400", '500', '600', '700'] });

export const metadata: Metadata = {
  title: "My AI Assistant",
  description: "This is my AI Assistant. Developed by Matthew Chukwu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={elite.className}>{children}</body>
    </html>
  );
}
