import type { Metadata } from "next";
import "./globals.css";
// import SidebarDemo from "@/components/navbar";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CampGround - Discover Your Perfect Campsite", // Custom title
  description:
    "Explore scenic campgrounds, book your next outdoor adventure, and experience nature like never before!", // Relevant description
  icons: {
    icon: "/img/logo/tent.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className=" h-screen flex flex-col">
          {children}

          <Toaster />
        </div>
      </body>
    </html>
  );
}
