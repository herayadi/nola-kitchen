"use client";

import { useMemo, useState } from "react";
import { menu } from "@/data/menu";
import { formatRupiah } from "@/lib/currency";
import { buildWhatsAppUrl, type CartMap } from "@/lib/whatsapp";

const BUSINESS_NAME = "Nola Kitchen";
const WHATSAPP_NUMBER = "6281295656710";

export default function NolaKitchenPage() {
  const [cart, setCart] = useState<CartMap>({});
  const [cartOpen, setCartOpen] = useState(false);

  const count = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const total = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = menu.find((menuItem) => menuItem.id === id);
        return sum + (item?.price ?? 0) * qty;
      }, 0),
    [cart]
  );

  function addToCart(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  function changeQty(id: string, delta: number) {
    setCart((current) => {
      const nextQty = (current[id] ?? 0) + delta;
      const next = { ...current };
      if (nextQty <= 0) delete next[id];
      else next[id] = nextQty;
      return next;
    });
  }

  function checkout() {
    if (!count) return;
    const url = buildWhatsAppUrl(WHATSAPP_NUMBER, BUSINESS_NAME, cart, menu);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const bestSeller = menu.find((item) => item.id === "paket-komplit-dada")!;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-nola-brown/10 bg-nola-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-nola-red text-lg font-black text-white">
              N
            </div>
            <div>
              <p className="font-black tracking-tight">Nola Kitchen</p>
              <p className="text-xs text-nola-brown/60">Cloud Kitchen • Masak fresh</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="#menu" className="hover:text-nola-red">Menu</a>
            <a href="#cara-pesan" className="hover:text-nola-red">Cara Pesan</a>
            <a href="#faq" className="hover:text-nola-red">FAQ</a>
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="rounded-full bg-nola-red px-4 py-2 text-sm font-bold text-white shadow-soft"
          >
            Keranjang <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5">{count}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="grain overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.1fr_.9fr] md:px-6 md:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-nola-brown/10 bg-white/70 px-3 py-2 text-sm font-semibold">
                🔥 Dibuat setelah order • 🚗 Kirim via ojol
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-.04em] md:text-7xl">
                Ayam goreng hangat. <span className="text-nola-red">Tinggal pesan.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-nola-brown/70">
                Nola Kitchen adalah cloud kitchen untuk makan siang, makan malam, atau saat kamu butuh makanan enak tanpa ribet. Pilih menu, tambah ke keranjang, lalu pesan lewat WhatsApp.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#menu" className="rounded-full bg-nola-red px-6 py-3 text-center font-extrabold text-white">
                  Lihat Menu
                </a>
                <a href="#paket" className="rounded-full border border-nola-brown/15 bg-white px-6 py-3 text-center font-extrabold">
                  Lihat Paket Hemat
                </a>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
                {[
                  ["Fresh", "Masak setelah order"],
                  ["Praktis", "Pesan online"],
                  ["Cepat", "Admin pesan ojol"],
                ].map(([title, subtitle]) => (
                  <div key={title} className="rounded-2xl bg-white/70 p-4">
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-nola-brown/60">{subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-full bg-nola-red/15 blur-3xl" />
              <div className="rounded-[2rem] border border-nola-brown/10 bg-white p-5 shadow-soft">
                <div className="rounded-[1.5rem] bg-nola-red p-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-[.2em] text-white/70">Best Seller</p>
                  <h2 className="mt-3 text-3xl font-black">{bestSeller.name}</h2>
                  <p className="mt-2 text-white/80">{bestSeller.description}</p>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/70">Mulai dari</p>
                      <p className="text-4xl font-black">{formatRupiah(bestSeller.price)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(bestSeller.id)}
                      className="rounded-full bg-white px-5 py-3 font-black text-nola-red"
                    >
                      + Pesan
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-nola-brown/50">
                  *Harga demo, silakan sesuaikan dengan harga jual final.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="paket" className="border-y border-nola-brown/10 bg-white/60">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3 md:px-6">
            <div className="rounded-3xl bg-nola-brown p-5 text-white">
              <p className="text-sm font-bold text-white/70">Paket praktis</p>
              <p className="mt-1 text-xl font-black">Ayam + nasi</p>
            </div>
            <div className="rounded-3xl bg-nola-red p-5 text-white">
              <p className="text-sm font-bold text-white/70">Paket lengkap</p>
              <p className="mt-1 text-xl font-black">Ayam + nasi + minum</p>
            </div>
            <div className="rounded-3xl border border-nola-brown/10 bg-white p-5 text-nola-brown">
              <p className="text-sm font-bold text-nola-brown/55">Untuk rame-rame</p>
              <p className="mt-1 text-xl font-black">Bisa tambah banyak item</p>
            </div>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[.2em] text-nola-red">Menu Nola Kitchen</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Pilih yang paling pas.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-nola-brown/60">
              Harga saat ini masih contoh. Nantinya bisa disesuaikan langsung dari file data menu.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((item) => (
              <article
                key={item.id}
                className="group rounded-[1.75rem] border border-nola-brown/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-nola-red/10 text-xl">🍗</div>
                  {item.badge ? (
                    <span className="rounded-full bg-nola-red/10 px-3 py-1 text-xs font-black text-nola-red">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-nola-brown/45">{item.category}</p>
                <h3 className="mt-2 text-xl font-black">{item.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-nola-brown/60">{item.description}</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-xl font-black">{formatRupiah(item.price)}</p>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="rounded-full bg-nola-brown px-4 py-2 text-sm font-black text-white transition group-hover:bg-nola-red"
                  >
                    + Tambah
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cara-pesan" className="bg-nola-brown text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <p className="font-bold uppercase tracking-[.2em] text-nola-cream/70">Cara Pesan</p>
            <h2 className="mt-2 text-4xl font-black">3 langkah, beres.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["01", "Pilih menu", "Tambah ayam, nasi, minuman, atau paket yang kamu inginkan."],
                ["02", "Kirim order", "Website menyusun order otomatis dan mengarahkannya ke WhatsApp Nola Kitchen."],
                ["03", "Admin pesan ojol", "Setelah pembayaran dan order dikonfirmasi, admin memesan ojol untuk mengantar makanan ke customer."],
              ].map(([number, title, description]) => (
                <div key={number} className="rounded-3xl bg-white/5 p-6">
                  <span className="text-3xl font-black text-nola-cream">{number}</span>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-2 text-white/65">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] bg-nola-red p-8 text-white">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-white/60">Jam Operasional</p>
              <h3 className="mt-3 text-3xl font-black">Buka setiap hari*</h3>
              <p className="mt-3 text-white/75">Contoh: 10.00–21.00 WIB. Ganti sesuai jam operasional aktual.</p>
            </div>
            <div className="rounded-[2rem] border border-nola-brown/10 bg-white p-8">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-nola-red">Area Pengiriman</p>
              <h3 className="mt-3 text-3xl font-black">Fokus radius dekat dapur.</h3>
              <p className="mt-3 text-nola-brown/65">
                Customer mengirim alamat via WhatsApp. Admin mengecek lokasi dan memesan ojol setelah order dikonfirmasi.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-nola-brown/10">
          <div className="mx-auto max-w-4xl px-4 py-14 md:px-6">
            <h2 className="text-4xl font-black">Pertanyaan umum</h2>
            <div className="mt-8 divide-y divide-nola-brown/10">
              <details className="py-5">
                <summary className="cursor-pointer font-black">Apakah bisa makan di tempat?</summary>
                <p className="mt-3 text-nola-brown/65">
                  Untuk konsep awal, Nola Kitchen adalah cloud kitchen sehingga pesanan dilakukan secara online dan dikirim menggunakan ojol.
                </p>
              </details>
              <details className="py-5">
                <summary className="cursor-pointer font-black">Apakah bisa pesan banyak?</summary>
                <p className="mt-3 text-nola-brown/65">
                  Bisa. Untuk order dalam jumlah besar, admin akan mengonfirmasi stok, waktu produksi, dan pengiriman melalui WhatsApp.
                </p>
              </details>
              <details className="py-5">
                <summary className="cursor-pointer font-black">Bagaimana proses pengantarannya?</summary>
                <p className="mt-3 text-nola-brown/65">
                  Setelah order dan pembayaran dikonfirmasi, admin Nola Kitchen akan memesan layanan ojol untuk mengantar pesanan ke alamat customer.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-nola-brown/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="font-black">Nola Kitchen</p>
            <p className="text-nola-brown/50">Cloud kitchen • order online • admin pesan ojol</p>
          </div>
          <p className="text-nola-brown/50">© {new Date().getFullYear()} Nola Kitchen</p>
        </div>
      </footer>

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full bg-nola-red px-5 py-4 font-black text-white shadow-2xl md:hidden"
      >
        <span>Pesan Sekarang</span>
        <span>{count} item</span>
      </button>

      {cartOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Tutup keranjang"
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-nola-cream shadow-2xl">
            <div className="flex items-center justify-between border-b border-nola-brown/10 p-5">
              <div>
                <p className="text-xl font-black">Keranjang</p>
                <p className="text-xs text-nola-brown/50">Periksa order sebelum kirim</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-nola-brown/10 bg-white px-3 py-2 font-bold"
              >
                Tutup
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {!count ? (
                <div className="rounded-3xl bg-white p-6 text-center text-nola-brown/55">
                  Keranjang masih kosong.<br />Pilih menu favoritmu dulu.
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = menu.find((menuItem) => menuItem.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="rounded-2xl bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-black">{item.name}</p>
                          <p className="text-sm text-nola-brown/50">{formatRupiah(item.price)}</p>
                        </div>
                        <p className="font-black">{formatRupiah(item.price * qty)}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => changeQty(id, -1)}
                          className="h-9 w-9 rounded-full border border-nola-brown/10 bg-nola-cream font-black"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center font-black">{qty}</span>
                        <button
                          onClick={() => changeQty(id, 1)}
                          className="h-9 w-9 rounded-full bg-nola-brown font-black text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-nola-brown/10 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black">{formatRupiah(total)}</span>
              </div>
              <button
                onClick={checkout}
                disabled={!count}
                className="w-full rounded-2xl bg-nola-red px-5 py-4 font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Pesan via WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-nola-brown/45">
                Pesanan akan dikirim ke WhatsApp Nola Kitchen untuk dikonfirmasi admin.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
