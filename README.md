# Nola Kitchen — Next.js + Tailwind CSS

Conversion-first MVP website untuk cloud kitchen Nola Kitchen.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Client-side cart
- WhatsApp checkout
- GitHub Pages static export

## Flow order
Customer → Website → pilih menu → cart → WhatsApp → admin konfirmasi → admin pesan ojol → makanan dikirim.

## Menjalankan project
```bash
npm install
npm run dev
```
Buka http://localhost:3000

## Deployment GitHub Pages
Push ke `main` akan menjalankan workflow `.github/workflows/deploy-pages.yml`, melakukan `next build`, lalu mem-publish folder `out/` ke GitHub Pages.

Project site menggunakan base path `/nola-kitchen`, sehingga URL production:
`https://herayadi.github.io/nola-kitchen/`

Di GitHub Settings → Pages, source harus menggunakan **GitHub Actions**.

## Yang wajib diganti sebelum production
Di `components/NolaKitchenPage.tsx`:
```ts
const WHATSAPP_NUMBER = "6281234567890";
```
Ganti dengan nomor WhatsApp Nola Kitchen dalam format internasional tanpa `+`.

## Edit menu & harga
Semua menu ada di:
`data/menu.ts`

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
- static export untuk GitHub Pages
- GitHub Actions deployment

Belum:
- backend/database
- payment gateway
- admin dashboard
- foto produk asli
- analytics/pixel
- integrasi GoFood/GrabFood
