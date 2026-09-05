# Nola Kitchen — Next.js + Tailwind CSS

Conversion-first MVP website untuk cloud kitchen Nola Kitchen.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Client-side cart
- WhatsApp checkout

## Flow order
Customer → Website → pilih menu → cart → WhatsApp → admin konfirmasi → admin pesan ojol → makanan dikirim.

## Menjalankan project
```bash
npm install
npm run dev
```
Buka http://localhost:3000

## Yang wajib diganti sebelum production
Di `components/NolaKitchenPage.tsx`:
```ts
const WHATSAPP_NUMBER = "6281234567890";
```
Ganti dengan nomor WhatsApp Nola Kitchen dalam format internasional tanpa `+`.

## Edit menu & harga
Semua menu ada di:
`data/menu.ts`

## Struktur
```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  NolaKitchenPage.tsx
data/
  menu.ts
lib/
  currency.ts
  whatsapp.ts
```

## Scope versi ini
Sudah:
- responsive landing page
- menu cards
- best seller hero
- cart drawer
- quantity controls
- total harga
- checkout WhatsApp otomatis
- SEO metadata dasar
- section cara pesan / FAQ / area pengiriman

Belum:
- backend/database
- payment gateway
- admin dashboard
- foto produk asli
- analytics/pixel
- integrasi GoFood/GrabFood
