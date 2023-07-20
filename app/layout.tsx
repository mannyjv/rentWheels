import { relative } from "path";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent Wheels",
  description: "Discover what kind of car you can drive today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"relative"}>
        {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
