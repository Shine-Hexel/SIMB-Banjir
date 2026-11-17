SIMB DIY – Sistem Informasi Mitigasi Banjir Yogyakarta

CARA PAKAI
- Buka index.html langsung di browser

STRUKTUR FOLDER
- index.html         : kerangka halaman (konten dinamis diisi script.js)
- style.css          : tampilan
- script.js          : logika (render konten, berita, peta, checklist, form lapor)
- data/berita.js     : berita & peringatan dini (file yang diedit tim)
- editor-berita.html : form pembuat kode berita untuk ditempel ke data/berita.js
- img/               : ilustrasi

MENGEDIT BERITA & PERINGATAN
- Buat kode lewat editor-berita.html, lalu tempel di paling atas daftar window.BERITA
  pada data/berita.js. Petunjuk lengkap ada di komentar awal file tersebut.

BERITA TERBARU (OTOMATIS)
- Mengambil berita 7 hari terakhir dari Google News RSS (kata kunci banjir + DIY/Yogyakarta).
- Diperbarui saat halaman dibuka, lewat tombol "Perbarui berita", dan tiap 15 menit
  (dilewati bila tab sedang tidak dilihat).
- Memakai layanan pihak ketiga rss2json. Bila gagal/CORS/timeout 10 detik, berita lokal tetap tampil.