import type { MenuItem } from "@/data/menu";
import { formatRupiah } from "@/lib/currency";

export type CartMap = Record<string, number>;

export function buildWhatsAppUrl(
  whatsappNumber: string,
  businessName: string,
  cart: CartMap,
  menu: MenuItem[]
) {
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const lines = entries.map(([id, qty]) => {
    const item = menu.find((menuItem) => menuItem.id === id);
    if (!item) return null;
    return `- ${item.name} x${qty} = ${formatRupiah(item.price * qty)}`;
  }).filter(Boolean);
  const total = entries.reduce((sum, [id, qty]) => {
    const item = menu.find((menuItem) => menuItem.id === id);
    return sum + (item?.price ?? 0) * qty;
  }, 0);
  const message = [
    `Halo ${businessName}, saya ingin pesan:`,
    "",
    ...lines,
    "",
    `Total menu: ${formatRupiah(total)}`,
    "",
    "Nama:",
    "Alamat pengantaran:",
    "Catatan pesanan:",
    "",
    "Mohon konfirmasi total pembayaran dan ongkir. Terima kasih.",
  ].join("\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
