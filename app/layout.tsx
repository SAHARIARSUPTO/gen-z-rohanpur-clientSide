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
    <html lang="en">
      <head>
        {/* Add Noto Sans Bengali font link from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }} // Apply Noto Sans Bengali font globally
      >
        {children}
      </body>
    </html>
  );
}
