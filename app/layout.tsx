import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nola Kitchen — Ayam Goreng Hangat, Tinggal Pesan",
  description:
    "Nola Kitchen adalah cloud kitchen ayam goreng. Pesan online, masak fresh, lalu dikirim menggunakan ojol.",
  metadataBase: new URL("https://nolakitchen.id"),
  openGraph: {
    title: "Nola Kitchen — Ayam Goreng Hangat, Tinggal Pesan",
    description:
      "Pesan ayam goreng, paket nasi, dan minuman secara online dari Nola Kitchen.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
