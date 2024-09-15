import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Cloth seller - Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar/>
        <main className="flex justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
