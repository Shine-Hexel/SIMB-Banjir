/*
  DATA BERITA & PERINGATAN: file ini yang diedit tim.
  - Tambah berita: salin satu blok { ... } di bawah, taruh di paling atas, ubah isinya
    (atau pakai editor-berita.html untuk membuat kodenya otomatis).
  - Paragraf baru di dalam "isi": tulis \n\n
  - Format tanggal: 'TAHUN-BULAN-TANGGAL'. Tanggal di bawah hanya contoh, silakan ganti.
*/
window.PERINGATAN = {
  aktif: true,            // true = tampil di paling atas situs, false = sembunyikan
  level: 'waspada',       // waspada | siaga | awas
  judul: 'Musim hujan, tetap waspada.',
  pesan: 'Pantau prakiraan BMKG dan bersihkan saluran air di sekitar rumah.',
  url: 'https://www.bmkg.go.id'
};

window.BERITA = [
  {
    "kategori": "Kejadian",
    "ikon": "bi-droplet",
    "judul": "Banjir di DIY: genangan, luapan sungai, dan longsor",
    "isi": "Di DIY banjir umumnya berupa genangan dan luapan sungai yang terjadi bersama cuaca ekstrem, sering disertai tanah longsor dan pohon tumbang. Pada Desember 2025, BPBD DIY mencatat 41 kejadian banjir genangan dan luapan: 22 di Bantul, 13 di Gunungkidul, 5 di Kulon Progo, dan 1 di Kota Yogyakarta.",
    "tanggal": "2026-01-06",
    "sumber": "BPBD DIY",
    "url": "https://bpbd.jogjaprov.go.id"
  },
  {
    "kategori": "Kejadian",
    "ikon": "bi-cloud-lightning-rain",
    "judul": "Cuaca ekstrem 26-27 Desember 2025: Bantul terdampak paling luas",
    "isi": "BPBD DIY mencatat cuaca ekstrem pada 26-27 Desember 2025 memicu banjir dan kerusakan di tiga kabupaten, dengan Kabupaten Bantul terdampak paling luas, termasuk banjir dan tanah longsor. Peristiwa ini mengingatkan kita untuk membersihkan saluran sebelum hujan lebat dan memantau peringatan BMKG.",
    "tanggal": "2026-01-09",
    "sumber": "BPBD DIY",
    "url": "https://bpbd.jogjaprov.go.id"
  },
  {
    "kategori": "Edukasi",
    "ikon": "bi-map",
    "judul": "Imogiri masuk peta rawan banjir DIY 2025",
    "isi": "BPBD DIY memperbarui peta kawasan rawan bencana berdasarkan kejadian 2024. Kapanewon Imogiri, Bantul, yang sebelumnya tidak tergolong rawan banjir, masuk peta setelah banjir 2024. Cek peta risiko di InaRISK dan tanyakan ke BPBD kabupaten/kota untuk kondisi wilayah Anda.",
    "tanggal": "2026-01-14",
    "sumber": "BPBD DIY",
    "url": "https://bpbd.jogjaprov.go.id"
  },
  {
    "kategori": "Lingkungan",
    "ikon": "bi-water",
    "judul": "Menjaga talud dan bantaran sungai di kota",
    "isi": "Sungai-sungai di Kota Yogyakarta melintasi kawasan padat permukiman. Pada Agustus 2025 TRC BPBD Kota Yogyakarta menangani retakan talud Sungai Winongo di Mantrijeron yang mengancam rumah di atasnya. Laporkan retakan talud atau penyempitan sungai sedini mungkin dan jangan membuang sampah ke sungai.",
    "tanggal": "2026-01-20",
    "sumber": "BPBD DIY",
    "url": "https://bpbd.jogjaprov.go.id"
  },
  {
    "kategori": "Persiapan",
    "ikon": "bi-exclamation-triangle",
    "judul": "Memahami status siaga darurat hidrometeorologi",
    "isi": "Saat musim hujan berpotensi banjir, longsor, dan cuaca ekstrem, status siaga darurat dapat ditetapkan, misalnya 20 Desember 2023 hingga 29 Februari 2024 di DIY. Status tingkat provinsi bergantung pada penetapan minimal dua kabupaten/kota. Artinya tim reaksi cepat disiagakan dan warga diimbau waspada.",
    "tanggal": "2026-01-27",
    "sumber": "BPBD DIY",
    "url": "https://bpbd.jogjaprov.go.id"
  },
  {
    "kategori": "Persiapan",
    "ikon": "bi-bag-check",
    "judul": "Menyusun tas siaga bencana keluarga",
    "isi": "Tas siaga berisi kebutuhan dasar untuk bertahan minimal 72 jam: dokumen, obat, makanan, air minum, senter, dan pakaian ganti. Simpan di tempat yang mudah dijangkau dan periksa isinya setiap enam bulan, terutama tanggal kedaluwarsa makanan dan obat.",
    "tanggal": "2026-02-03"
  },
  {
    "kategori": "Lingkungan",
    "ikon": "bi-tree",
    "judul": "Biopori dan sumur resapan di rumah",
    "isi": "Lubang resapan biopori membantu air hujan meresap ke tanah sehingga mengurangi limpasan permukaan. Biayanya rendah dan bisa dibuat di halaman rumah. Sumur resapan lebih besar dan cocok untuk menampung air dari atap.",
    "tanggal": "2026-02-10"
  },
  {
    "kategori": "Kesehatan",
    "ikon": "bi-heart-pulse",
    "judul": "Menjaga kesehatan pascabanjir",
    "isi": "Air banjir membawa bakteri dan limbah. Gunakan alas kaki dan sarung tangan, cuci tangan dengan sabun, minum air matang, dan bersihkan rumah dengan desinfektan. Segera periksa ke fasilitas kesehatan bila muncul demam, diare, atau nyeri otot.",
    "tanggal": "2026-02-17"
  }
];
