"use client";

import { useMemo, useState } from "react";
import { menu, type MenuItem } from "@/data/menu";
import { formatRupiah } from "@/lib/currency";
import { buildWhatsAppUrl, type CartMap } from "@/lib/whatsapp";

const BUSINESS_NAME = "Nola Kitchen";
const WHATSAPP_NUMBER = "6281295656710";

const menuGroups: { title: string; description: string; items: MenuItem[] }[] = [
  {
    title: "Paket",
    description: "Pilihan paling praktis untuk makan lengkap.",
    items: menu.filter((item) => item.category === "Paket" || item.category === "Paket Komplit"),
  },
  {
    title: "Ayam & tambahan",
    description: "Untuk kamu yang mau atur porsinya sendiri.",
    items: menu.filter((item) => item.category === "Satuan" || item.category === "Tambahan"),
  },
  {
    title: "Minuman",
    description: "Teman sederhana untuk makan yang baru matang.",
    items: menu.filter((item) => item.category === "Minuman"),
  },
];

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

  const featured = menu.find((item) => item.id === "paket-komplit-dada")!;

  function addToCart(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  function changeQty(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const nextQty = (next[id] ?? 0) + delta;
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

  return (
    <div className="min-h-screen bg-nola-cream text-nola-brown">
      <header className="sticky top-0 z-40 border-b border-nola-brown/10 bg-nola-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Nola Kitchen home">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-nola-red text-sm font-black text-white">
              N
            </span>
            <span className="leading-none">
              <span className="block text-sm font-black tracking-[-0.02em]">NOLA KITCHEN</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-nola-brown/45">
                Cloud kitchen
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="#menu" className="transition hover:text-nola-red">Menu</a>
            <a href="#cara-pesan" className="transition hover:text-nola-red">Cara pesan</a>
            <a href="#faq" className="transition hover:text-nola-red">FAQ</a>
          </nav>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-nola-red px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-nola-brown"
          >
            Keranjang
            <span className="grid min-w-6 place-items-center rounded-md bg-white/15 px-1.5 py-0.5 text-xs">{count}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="bg-nola-brown text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white/55">
                Ayam goreng • dibuat setelah order
              </p>
              <h1 className="max-w-4xl text-[3.3rem] font-black leading-[0.93] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Makan enak tidak perlu banyak mikir.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                Pilih ayam, nasi, dan minuman. Kami siapkan setelah order masuk, lalu admin bantu atur pengantaran lewat ojol.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#menu"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-nola-red px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-nola-brown"
                >
                  Lihat menu
                </a>
                <a
                  href="https://wa.me/6281295656710"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 text-sm font-black text-white transition hover:border-white hover:bg-white hover:text-nola-brown"
                >
                  Chat WhatsApp
                </a>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-1 border-t border-white/15 sm:grid-cols-3">
                {[
                  ["Fresh", "Dimasak setelah order"],
                  ["Simple", "Pilih, checkout, chat"],
                  ["Delivered", "Admin pesan ojol"],
                ].map(([title, desc], index) => (
                  <div
                    key={title}
                    className={`py-5 sm:pr-5 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0 sm:pl-5" : ""}`}
                  >
                    <p className="text-sm font-black">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/50">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-6">
              <div className="relative overflow-hidden rounded-[24px] bg-nola-red p-7 sm:p-9">
                <div className="absolute -right-8 -top-14 h-40 w-40 rounded-full border-[26px] border-white/10" />
                <div className="absolute -bottom-14 -left-12 h-44 w-44 rounded-full border-[28px] border-nola-brown/10" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-5 border-b border-white/20 pb-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/65">Pilihan hari ini</p>
                    <span className="rounded-lg bg-nola-brown px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                      Best seller
                    </span>
                  </div>

                  <div className="py-9 sm:py-12">
                    <p className="max-w-md text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                      Paket Komplit Dada
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">{featured.description}</p>
                  </div>

                  <div className="flex flex-col gap-5 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Harga</p>
                      <p className="mt-1 text-4xl font-black tracking-[-0.04em]">{formatRupiah(featured.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(featured.id)}
                      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-black text-nola-brown transition hover:-translate-y-0.5 hover:bg-nola-brown hover:text-white"
                    >
                      Tambah ke keranjang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            <div className="grid gap-8 border-b border-nola-brown/15 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-nola-red">Menu</p>
                <h2 className="mt-3 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                  Sedikit pilihan. Biar cepat sampai ke meja makan.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-nola-brown/60 lg:justify-self-end">
                Kami sengaja membuat menu ringkas. Tidak ada puluhan varian yang bikin bingung—tinggal pilih potongan ayam, paket, dan minuman yang paling pas.
              </p>
            </div>

            <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2">
              {menuGroups.map((group) => (
                <div key={group.title} className={group.title === "Paket" ? "lg:row-span-2" : ""}>
                  <div className="mb-5 flex items-end justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-black tracking-[-0.03em]">{group.title}</h3>
                      <p className="mt-1 text-sm text-nola-brown/50">{group.description}</p>
                    </div>
                    <span className="text-xs font-black text-nola-brown/35">{String(group.items.length).padStart(2, "0")}</span>
                  </div>

                  <div className="border-t border-nola-brown/15">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="group grid grid-cols-[1fr_auto] gap-4 border-b border-nola-brown/15 py-5"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-base font-black tracking-[-0.02em]">{item.name}</h4>
                            {item.badge ? (
                              <span className="rounded-md bg-nola-red/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-nola-red">
                                {item.badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm leading-6 text-nola-brown/50">{item.description}</p>
                          <p className="mt-3 text-base font-black">{formatRupiah(item.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          aria-label={`Tambah ${item.name}`}
                          className="mt-1 grid h-11 w-11 place-items-center rounded-xl border border-nola-brown/15 bg-transparent text-xl font-bold transition hover:border-nola-red hover:bg-nola-red hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cara-pesan" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-nola-red">Cara pesan</p>
                <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.045em] sm:text-5xl">
                  Dari dapur ke depan pintu.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-nola-brown/55">
                  Website ini dibuat untuk memperpendek proses order, bukan menambah langkah baru.
                </p>
              </div>

              <div className="border-t border-nola-brown/15">
                {[
                  ["01", "Pilih menu", "Masukkan makanan dan minuman yang kamu mau ke keranjang."],
                  ["02", "Kirim ke WhatsApp", "Kami susun detail order dan totalnya otomatis dalam satu pesan."],
                  ["03", "Kami urus pengantaran", "Setelah order dikonfirmasi, admin memesan ojol ke alamat customer."],
                ].map(([number, title, desc]) => (
                  <div key={number} className="grid gap-3 border-b border-nola-brown/15 py-7 sm:grid-cols-[72px_180px_1fr] sm:items-start">
                    <span className="text-sm font-black text-nola-red">{number}</span>
                    <h3 className="text-lg font-black tracking-[-0.02em]">{title}</h3>
                    <p className="max-w-lg text-sm leading-6 text-nola-brown/55">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-nola-red text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Lagi lapar?</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-4xl">
                Pilih dulu makanannya. Urusan pengantaran, biar kami yang atur.
              </h2>
            </div>
            <a
              href="#menu"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-nola-brown transition hover:-translate-y-0.5 hover:bg-nola-brown hover:text-white"
            >
              Pilih menu
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid border-y border-nola-brown/15 md:grid-cols-2">
            <div className="py-8 md:pr-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-nola-red">Jam operasional</p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">Setiap hari*</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-nola-brown/55">
                Contoh sementara: 10.00–21.00 WIB. Jam final bisa disesuaikan setelah operasional dapur ditetapkan.
              </p>
            </div>
            <div className="border-t border-nola-brown/15 py-8 md:border-l md:border-t-0 md:pl-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-nola-red">Pengantaran</p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">Via ojol dari admin.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-nola-brown/55">
                Customer cukup kirim alamat. Admin Nola Kitchen mengecek area dan mengatur driver setelah pesanan dikonfirmasi.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 bg-nola-brown text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-nola-red">FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em]">Yang sering ditanyakan.</h2>
            </div>
            <div className="border-t border-white/15">
              {[
                ["Apakah bisa makan di tempat?", "Belum. Pada fase awal Nola Kitchen beroperasi sebagai cloud kitchen dengan pemesanan online."],
                ["Apakah bisa pesan dalam jumlah banyak?", "Bisa. Admin akan membantu konfirmasi stok, waktu produksi, dan skema pengiriman melalui WhatsApp."],
                ["Bagaimana proses pengantarannya?", "Setelah order dan pembayaran dikonfirmasi, admin memesan layanan ojol untuk mengantar ke alamat customer."],
              ].map(([question, answer]) => (
                <details key={question} className="group border-b border-white/15 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-black">
                    {question}
                    <span className="text-xl font-normal text-white/45 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-7 text-white/55">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-nola-brown text-white">
        <div className="mx-auto max-w-7xl border-t border-white/10 px-5 py-8 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-lg font-black tracking-[-0.03em]">NOLA KITCHEN</p>
              <p className="mt-2 text-xs leading-5 text-white/45">Ayam goreng hangat. Pesan online. Dikirim via ojol.</p>
            </div>
            <div className="text-left text-xs leading-6 text-white/45 sm:text-right">
              <p>WhatsApp 0812 9565 6710</p>
              <p>© {new Date().getFullYear()} Nola Kitchen</p>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-4 left-4 right-4 z-30 flex min-h-14 items-center justify-between rounded-xl bg-nola-red px-5 text-sm font-black text-white shadow-soft md:hidden"
      >
        <span>Pesan sekarang</span>
        <span>{count ? `${count} item · ${formatRupiah(total)}` : "Lihat keranjang"}</span>
      </button>

      {cartOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Tutup keranjang"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 h-full w-full bg-nola-brown/55 backdrop-blur-[2px]"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-nola-cream shadow-drawer">
            <div className="flex items-start justify-between border-b border-nola-brown/15 px-5 py-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-nola-red">Order</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">Keranjang</h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-nola-brown/15 text-xl transition hover:bg-nola-brown hover:text-white"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3">
              {!count ? (
                <div className="py-16 text-center">
                  <p className="text-lg font-black">Belum ada yang dipilih.</p>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-nola-brown/50">
                    Tutup keranjang dan pilih menu yang mau kamu pesan.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 rounded-xl bg-nola-brown px-5 py-3 text-sm font-black text-white"
                  >
                    Kembali ke menu
                  </button>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = menu.find((menuItem) => menuItem.id === id);
                  if (!item) return null;

                  return (
                    <div key={id} className="border-b border-nola-brown/15 py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-black">{item.name}</h3>
                          <p className="mt-1 text-sm text-nola-brown/50">{formatRupiah(item.price)} / item</p>
                        </div>
                        <p className="font-black">{formatRupiah(item.price * qty)}</p>
                      </div>
                      <div className="mt-4 inline-flex items-center overflow-hidden rounded-xl border border-nola-brown/15 bg-white">
                        <button
                          type="button"
                          onClick={() => changeQty(id, -1)}
                          className="grid h-10 w-10 place-items-center text-lg font-black transition hover:bg-nola-brown hover:text-white"
                        >
                          −
                        </button>
                        <span className="grid h-10 min-w-10 place-items-center border-x border-nola-brown/15 text-sm font-black">{qty}</span>
                        <button
                          type="button"
                          onClick={() => changeQty(id, 1)}
                          className="grid h-10 w-10 place-items-center text-lg font-black transition hover:bg-nola-red hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-nola-brown/15 bg-white p-5">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-nola-brown/40">Total menu</p>
                  <p className="mt-1 text-2xl font-black tracking-[-0.03em]">{formatRupiah(total)}</p>
                </div>
                <p className="text-xs text-nola-brown/40">Ongkir dikonfirmasi admin</p>
              </div>
              <button
                type="button"
                onClick={checkout}
                disabled={!count}
                className="mt-5 min-h-13 w-full rounded-xl bg-nola-red px-5 py-4 text-sm font-black text-white transition enabled:hover:-translate-y-0.5 enabled:hover:bg-nola-brown disabled:cursor-not-allowed disabled:opacity-35"
              >
                Kirim order ke WhatsApp
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
