/*
  DATA BERITA & PERINGATAN: file ini yang diedit tim.

  Tambah berita:
    - Salin satu blok { ... } di bawah, taruh di paling atas daftar, lalu ubah isinya
      (atau buat kodenya otomatis lewat editor-berita.html).
    - Wajib: kategori, judul, isi, tanggal. Opsional: ikon, sumber, url.
    - Format tanggal: 'TAHUN-BULAN-TANGGAL', contoh '2026-11-17'.
    - Kategori baru otomatis muncul sebagai tombol filter.
    - "ikon" memakai nama ikon Bootstrap Icons (https://icons.getbootstrap.com).
      Bila dikosongkan, ikon dipilih otomatis sesuai kategori.
    - Peringatan: setelah menulis \n\n di dalam "isi", halaman akan merapikannya
      menjadi satu paragraf cuplikan; teks lengkap ada di situs sumber (url).

  Peringatan dini (bilah di paling atas situs):
    - aktif : true = tampil, false = sembunyikan
    - level : "waspada" | "siaga" | "awas"  (selain itu dianggap "waspada")
  Tanggal pada contoh di bawah hanya contoh, silakan ganti.
*/
window.PERINGATAN = {
  aktif: true, // true = tampil di paling atas situs, false = sembunyikan
  level: "waspada", // waspada | siaga | awas
  judul: "Musim hujan, tetap waspada.",
  pesan: "Pantau prakiraan BMKG dan bersihkan saluran air di sekitar rumah.",
  url: "https://www.bmkg.go.id",
};

window.BERITA = [
  {
    kategori: "Kejadian",
    ikon: "bi-droplet",
    judul: "Banjir di DIY: genangan, luapan sungai, dan longsor",
    isi: "Di DIY banjir umumnya berupa genangan dan luapan sungai yang terjadi bersama cuaca ekstrem, sering disertai tanah longsor dan pohon tumbang. Pada Desember 2025, BPBD DIY mencatat 41 kejadian banjir genangan dan luapan: 22 di Bantul, 13 di Gunungkidul, 5 di Kulon Progo, dan 1 di Kota Yogyakarta.",
    tanggal: "2026-01-06",
    sumber: "BPBD DIY (Buletin Januari 2026)",
    url: "https://bpbd.jogjaprov.go.id/assets/uploads/Buletin_JANUARI_2026.pdf",
  },
  {
    kategori: "Kejadian",
    ikon: "bi-cloud-lightning-rain",
    judul: "Cuaca ekstrem 26-27 Desember 2025: Bantul terdampak paling luas",
    isi: "BPBD DIY mencatat cuaca ekstrem pada 26-27 Desember 2025 memicu banjir dan kerusakan di tiga kabupaten, dengan Kabupaten Bantul terdampak paling luas, termasuk banjir dan tanah longsor. Peristiwa ini mengingatkan kita untuk membersihkan saluran sebelum hujan lebat dan memantau peringatan BMKG.",
    tanggal: "2026-01-09",
    sumber: "Metro TV",
    url: "https://www.metrotvnews.com/read/NLMC80vD-bantul-jadi-wilayah-terdampak-cuaca-ekstrem-paling-luas-di-diy",
  },
  {
    kategori: "Edukasi",
    ikon: "bi-map",
    judul: "Imogiri masuk peta rawan banjir DIY 2025",
    isi: "BPBD DIY memperbarui peta kawasan rawan bencana berdasarkan kejadian 2024. Kapanewon Imogiri, Bantul, yang sebelumnya tidak tergolong rawan banjir, masuk peta setelah banjir 2024. Cek peta risiko di InaRISK dan tanyakan ke BPBD kabupaten/kota untuk kondisi wilayah Anda.",
    tanggal: "2026-01-14",
    sumber: "Antara Jogja",
    url: "https://jogja.antaranews.com/berita/767809/bpbd-diy-memperbarui-peta-rawan-bencana-memasuki-musim-hujan",
  },
  {
    kategori: "Lingkungan",
    ikon: "bi-water",
    judul: "Menjaga talud dan bantaran sungai di kota",
    isi: "Sungai-sungai di Kota Yogyakarta melintasi kawasan padat permukiman. Pada Agustus 2025 TRC BPBD Kota Yogyakarta menangani retakan talud Sungai Winongo di Mantrijeron yang mengancam rumah di atasnya. Laporkan retakan talud atau penyempitan sungai sedini mungkin dan jangan membuang sampah ke sungai.",
    tanggal: "2026-01-20",
    sumber: "BPBD DIY (Buletin September 2025)",
    url: "https://bpbd.jogjaprov.go.id/assets/uploads/Buletin_SEPTEMBER_2025.pdf",
  },
  {
    kategori: "Persiapan",
    ikon: "bi-exclamation-triangle",
    judul: "Memahami status siaga darurat hidrometeorologi",
    isi: "Saat musim hujan berpotensi banjir, longsor, dan cuaca ekstrem, status siaga darurat dapat ditetapkan, misalnya 20 Desember 2023 hingga 29 Februari 2024 di DIY. Status tingkat provinsi bergantung pada penetapan minimal dua kabupaten/kota. Artinya tim reaksi cepat disiagakan dan warga diimbau waspada.",
    tanggal: "2026-01-27",
    sumber: "BPBD DIY",
    url: "https://bpbd.jogjaprov.go.id/berita/bedah-data-kebencanaan-tahun-2023-diy",
  },
];
