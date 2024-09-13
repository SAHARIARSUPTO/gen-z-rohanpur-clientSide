import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEN-Z ROHANPUR",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-black">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "'Noto Sans Bengali', sans-serif",
          color: "inherit", // Use inherited color
        }}
      >
        {children}
      </body>
    </html>
  );
}
