import { getURL } from '@/utils/helpers';
import Footer from '@/components/ui/navigation/footer';
import Header from '@/components/ui/navigation/header';
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast-hot/toaster"
import { Suspense, PropsWithChildren } from 'react';
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const title = 'XRL Cards';
const description = 'A sustainable eco friendly business card solution.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  },
  icons: {
    icon: '/logo.svg',
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main
          className="min-h-[calc(100dvh-10rem)] md:min-h[calc(100dvh-10rem)]"
        >
          {children}
        </main>
        <Footer />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
