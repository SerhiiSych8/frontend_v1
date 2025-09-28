import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casinade - Your Ultimate Casino Experience",
  description: "Join Casinade for the best online casino games, secure authentication, and amazing bonuses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geologica.variable} antialiased px-4 md:px-6 lg:px-8 pt-5`}
      >
        <AuthProvider>
          <Layout>
            {children}
            <ToastContainer />
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
