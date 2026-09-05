export type MenuItem = {
  id: string;
  name: string;
  category: "Satuan" | "Tambahan" | "Paket" | "Minuman" | "Paket Komplit";
  price: number;
  description: string;
  badge?: string;
};

export const menu: MenuItem[] = [
  { id: "ayam-dada", name: "Ayam Goreng Dada", category: "Satuan", price: 18000, description: "Ayam goreng bagian dada, gurih dan juicy.", badge: "Favorit" },
  { id: "ayam-paha", name: "Ayam Goreng Paha", category: "Satuan", price: 17000, description: "Ayam goreng bagian paha, empuk dan gurih." },
  { id: "nasi", name: "Nasi Putih", category: "Tambahan", price: 6000, description: "Nasi putih hangat." },
  { id: "paket-dada", name: "Paket Dada", category: "Paket", price: 23000, description: "Ayam goreng dada + nasi putih.", badge: "Hemat" },
  { id: "paket-paha", name: "Paket Paha", category: "Paket", price: 22000, description: "Ayam goreng paha + nasi putih." },
  { id: "es-teh-tawar", name: "Es Teh Tawar", category: "Minuman", price: 5000, description: "Es teh tanpa gula." },
  { id: "es-teh-manis", name: "Es Teh Manis", category: "Minuman", price: 6000, description: "Es teh manis segar." },
  { id: "paket-komplit-dada", name: "Paket Komplit Dada", category: "Paket Komplit", price: 28000, description: "Ayam dada + nasi putih + es teh manis.", badge: "Best Seller" },
  { id: "paket-komplit-paha", name: "Paket Komplit Paha", category: "Paket Komplit", price: 27000, description: "Ayam paha + nasi putih + es teh manis." },
];
