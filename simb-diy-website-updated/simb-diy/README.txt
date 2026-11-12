SIMB DIY, versi biasa (tanpa Laravel / tanpa database)
Buka index.html langsung di browser, atau taruh seluruh folder di hosting statis (GitHub Pages, Netlify, dll).

Tim mengedit berita & peringatan dini di: data/berita.js
Biar gampang, buat kodenya lewat editor-berita.html lalu tempel di data/berita.js.
Gambar ilustrasi ada di img/.

Berita terbaru:
- Situs mengambil berita 7 hari terakhir dari Google News RSS dengan kata kunci banjir/bencana/cuaca ekstrem di DIY/Yogyakarta.
- Klik tombol 'Baca berita asli' untuk membuka artikel pada situs penerbit.
- Feed diperbarui saat halaman dibuka, melalui tombol Perbarui berita, dan otomatis setiap 15 menit.
- Pengambilan feed memakai layanan pihak ketiga rss2json. Jika layanan gagal/CORS/jaringan bermasalah, artikel lokal tetap muncul.
- Untuk penggunaan produksi, sebaiknya pindahkan pengambilan RSS ke backend/proxy milik sendiri agar tidak bergantung pada layanan pihak ketiga.
