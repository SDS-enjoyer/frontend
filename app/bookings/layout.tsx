import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mt-24 ">{children}</main>
      <Footer />
    </>
  );
}
