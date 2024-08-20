import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "TS360",
    template: "%s | TS360",
  },
  description: "Continuous Testing at the speed of Agile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white font-poppins" style={{ background: 'white' }}> <NextAuthSessionProvider>{children}</NextAuthSessionProvider> </body>
    </html>
  );
}
