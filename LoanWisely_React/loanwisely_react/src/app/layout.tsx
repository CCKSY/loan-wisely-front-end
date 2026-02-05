// “앱의 최상위 레이아웃과 공통 Provider를 감싸는 파일
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "LoanWisely",
  description: "Loan recommendation experience",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ko" className={spaceGrotesk.variable}>
    <body className="font-[var(--font-space-grotesk)] antialiased">
      <QueryProvider>{children}</QueryProvider>
    </body>
  </html>
);

export default RootLayout;



