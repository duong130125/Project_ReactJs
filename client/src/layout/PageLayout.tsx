import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen ${className ?? ""}`}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
