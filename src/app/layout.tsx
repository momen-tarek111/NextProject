import type { Metadata } from "next";
import { Inter} from "next/font/google";
import { ToastContainer } from 'react-toastify';

import "./globals.css";
import Header from "@/components/header/Header"
import Footer from "@/components/footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";


const inter = Inter({variable:"--font-inter",subsets: ["latin"],})

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "cloud hosting project",
};

export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>){

  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header/>
        <ToastContainer position="top-center" theme="colored"/>
        <main>

          {children}
          
        </main>
        <Footer/>
      </body>
    </html>
  );
}
