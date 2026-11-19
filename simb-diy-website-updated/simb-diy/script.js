/* =============================================================
   SIMB DIY – script.js
   Urutan file:
     1. Utilitas        – fungsi kecil yang dipakai di banyak tempat
     2. Data statis     – isi konten (intro, mitigasi, FAQ, kontak, statistik)
     3. Render bagian   – satu fungsi per bagian halaman
     4. Inisialisasi    – memanggil semua fungsi render
   ============================================================= */
"use strict";

/* =============================================================
   1. UTILITAS
   ============================================================= */

// Singkatan untuk document.getElementById
const $ = (id) => document.getElementById(id);

// Mencegah XSS: mengubah karakter HTML berbahaya menjadi teks biasa
const ESC_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const escapeHTML = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ESC_MAP[c]);

// Hanya izinkan tautan http/https (menolak "javascript:" dan sejenisnya)
const urlAman = (u) => (/^https?:\/\//i.test(u || "") ? u : "");

// Array string -> <ul><li>...</li></ul>
const ul = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;

// Date -> "17 November 2026"
const formatTanggal = (date) =>
  date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Date -> "2026-11-17" memakai zona waktu lokal (toISOString memakai UTC, bisa meleset sehari)
const toISODate = (d) => {
  const dua = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${dua(d.getMonth() + 1)}-${dua(d.getDate())}`;
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* =============================================================
   2. DATA STATIS
   ============================================================= */

const NOMOR_WA_BPBD = "6285212863744";

const INTRO = {
  Pengertian:
    '<p class="mb-0">Banjir adalah meluapnya air yang menggenangi daratan yang biasanya kering, karena air sungai, laut, atau hujan melebihi kapasitas penyerapan tanah dan penyaluran saluran air. Banjir menjadi bencana dengan jumlah kejadian tertinggi di Indonesia setiap tahun.</p>',
  Jenis: ul([
    "<b>Banjir sungai:</b> sungai meluap setelah hujan lebat di hulu atau sekitar",
    "<b>Banjir bandang:</b> arus deras tiba-tiba, sering membawa lumpur dan batang kayu",
    "<b>Banjir genangan:</b> air tertahan karena drainase buruk, umum di perkotaan",
    "<b>Banjir rob:</b> air laut pasang menggenangi daratan pesisir",
  ]),
  Penyebab: ul([
    "Curah hujan tinggi dan berlangsung lama",
    "Sungai dan drainase dangkal akibat sedimen dan sampah",
    "Hilangnya hutan dan daerah resapan air",
    "Pasang air laut dan penurunan muka tanah",
    "Tanggul atau bendungan rusak",
  ]),
  "Di DIY": ul([
    "Banjir di DIY umumnya berupa genangan dan luapan sungai yang muncul bersama cuaca ekstrem",
    "Kota Yogyakarta padat permukiman di sekitar sungai; prakiraan BMKG musim hujan 2022 menilai potensi banjir sedang di Kota Yogyakarta dan Gunungkidul bagian timur",
    "Kulon Progo dan Gunungkidul juga rawan tanah longsor di wilayah perbukitan",
    "Lima wilayah siaga: Kota Yogyakarta, Sleman, Bantul, Kulon Progo, dan Gunungkidul",
  ]),
  Dampak: ul([
    "Korban jiwa, luka, dan warga mengungsi",
    "Rumah, jalan, sekolah, dan fasilitas umum rusak",
    "Lahan pertanian dan usaha terganggu",
    "Penyakit: diare, leptospirosis, penyakit kulit, ISPA",
  ]),
};

const TAHAP_MITIGASI = [
  {
    ikon: "bi-house-check",
    judul: "Sebelum banjir",
    langkah: [
      "Bersihkan saluran air dan selokan secara rutin",
      "Buat sumur resapan atau biopori di halaman",
      "Kenali jalur dan titik evakuasi terdekat",
      "Siapkan tas siaga dan simpan dokumen di wadah kedap air",
      "Pantau peringatan cuaca BMKG dan info BPBD",
    ],
  },
  {
    ikon: "bi-exclamation-triangle",
    judul: "Saat banjir",
    langkah: [
      "Matikan listrik dan gas, cabut peralatan elektronik",
      "Evakuasi ke tempat tinggi, dahulukan anak, lansia, dan difabel",
      "Jangan berjalan atau berkendara melewati arus deras",
      "Hindari kontak langsung dengan air banjir",
      "Hubungi 117 atau 112 bila butuh bantuan",
    ],
  },
  {
    ikon: "bi-heart-pulse",
    judul: "Setelah banjir",
    langkah: [
      "Pastikan bangunan aman sebelum masuk kembali",
      "Bersihkan dan desinfeksi rumah serta peralatan",
      "Gunakan sepatu boot dan sarung tangan saat membersihkan",
      "Waspadai diare, leptospirosis, dan penyakit kulit",
      "Dokumentasikan kerusakan untuk pengajuan bantuan",
    ],
  },
];

const CHECKLIST_TAS_SIAGA = [
  "Dokumen penting dalam plastik kedap air",
  "Senter dan baterai cadangan",
  "Obat pribadi dan perlengkapan P3K",
  "Makanan tahan lama",
  "Air minum (cukup untuk 3 hari)",
  "Pakaian ganti dan jas hujan",
  "Power bank dan charger",
  "Radio kecil bertenaga baterai",
  "Uang tunai secukupnya",
  "Peluit",
  "Masker dan sabun",
  "Selimut dan alas tidur",
];

// Jumlah kejadian bencana (semua jenis) di DIY per tahun – BPBD DIY
const BENCANA_PER_TAHUN = [
  { tahun: "2021", jumlah: 958 },
  { tahun: "2022", jumlah: 1817 },
  { tahun: "2023", jumlah: 1418 },
];

// Banjir genangan & luapan sungai, Desember 2025.
// Satu sumber data untuk grafik batang DAN peta (lat/lng = perkiraan titik tengah wilayah).
const BANJIR_DES_2025 = [
  { wilayah: "Bantul", jumlah: 22, lat: -7.888, lng: 110.329 },
  { wilayah: "Gunungkidul", jumlah: 13, lat: -7.964, lng: 110.605 },
  { wilayah: "Kulon Progo", jumlah: 5, lat: -7.857, lng: 110.16 },
  { wilayah: "Kota Yogyakarta", jumlah: 1, lat: -7.797, lng: 110.37 },
  { wilayah: "Sleman", jumlah: 0, lat: -7.716, lng: 110.356 },
];

const FAQ = [
  {
    tanya: "Apa yang harus dilakukan pertama kali saat air naik?",
    jawab:
      "Matikan listrik dan gas, amankan dokumen penting, lalu segera menuju tempat yang lebih tinggi sesuai arahan petugas.",
  },
  {
    tanya: "Bolehkah menerobos banjir dengan kendaraan?",
    jawab:
      "Tidak. Air yang tampak dangkal pun dapat menyembunyikan lubang atau arus kuat, dan dapat membuat kendaraan mogok atau hanyut. Cari jalur lain.",
  },
  {
    tanya: "Kapan sebaiknya mengungsi?",
    jawab:
      "Saat status Siaga atau Awas, atau ketika petugas menginstruksikan evakuasi. Lebih baik berangkat lebih awal daripada terlambat.",
  },
  {
    tanya: "Bagaimana mencegah penyakit pascabanjir?",
    jawab:
      "Gunakan alas kaki, cuci tangan dengan sabun, minum air matang, dan bersihkan rumah dengan desinfektan. Periksa ke fasilitas kesehatan bila sakit.",
  },
  {
    tanya: "Ke mana melapor banjir di DIY?",
    jawab:
      "Hubungi Pusdalops BPBD DIY di (0274) 555584 atau WhatsApp 0852-1286-3744, BPBD kabupaten/kota Anda, atau panggilan darurat 112 dan BNPB 117. Sebutkan lokasi lengkap dan kondisi yang terjadi.",
  },
];

const SUMBER_RESMI = [
  {
    nama: "BPBD DIY",
    ket: "Pusdalops dan informasi kebencanaan DIY",
    url: "https://bpbd.jogjaprov.go.id",
    ikon: "bi-geo-alt",
  },
  {
    nama: "BNPB",
    ket: "Badan Nasional Penanggulangan Bencana",
    url: "https://bnpb.go.id",
    ikon: "bi-shield-check",
  },
  {
    nama: "DIBI BNPB",
    ket: "Data Informasi Bencana Indonesia",
    url: "https://dibi.bnpb.go.id",
    ikon: "bi-bar-chart",
  },
  {
    nama: "BMKG",
    ket: "Prakiraan cuaca dan peringatan dini",
    url: "https://www.bmkg.go.id",
    ikon: "bi-cloud-rain-heavy",
  },
  {
    nama: "InaRISK",
    ket: "Peta risiko bencana BNPB",
    url: "https://inarisk.bnpb.go.id",
    ikon: "bi-map",
  },
];

const KONTAK_DARURAT = [
  {
    nama: "Panggilan Darurat",
    ket: "Layanan darurat terpadu",
    nomor: "112",
    ikon: "bi-broadcast",
  },
  {
    nama: "BNPB",
    ket: "Penanggulangan bencana",
    nomor: "117",
    ikon: "bi-shield-check",
  },
  {
    nama: "Basarnas",
    ket: "Pencarian dan pertolongan",
    nomor: "115",
    ikon: "bi-life-preserver",
  },
  {
    nama: "Ambulans",
    ket: "Gawat darurat medis",
    nomor: "119",
    ikon: "bi-heart-pulse",
  },
  {
    nama: "Polisi",
    ket: "Keamanan dan evakuasi",
    nomor: "110",
    ikon: "bi-person-badge",
  },
  {
    nama: "Damkar",
    ket: "Pemadam dan penyelamatan",
    nomor: "113",
    ikon: "bi-fire",
  },
  {
    nama: "PLN",
    ket: "Gangguan listrik",
    nomor: "123",
    ikon: "bi-lightning-charge",
  },
];

// Ikon bawaan per kategori, dipakai bila berita tidak menulis "ikon" sendiri
const IKON_KATEGORI = {
  Kejadian: "bi-droplet",
  Edukasi: "bi-map",
  Lingkungan: "bi-water",
  Persiapan: "bi-bag-check",
  Kesehatan: "bi-heart-pulse",
  "Berita terbaru": "bi-newspaper",
};

/* =============================================================
   3. RENDER BAGIAN HALAMAN
   ============================================================= */

/* ---------- 3.1 Mengenal Banjir (tab) ---------- */
function renderIntro() {
  const tabs = $("introTabs");
  const body = $("introBody");

  Object.entries(INTRO).forEach(([nama, isi], i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-link" + (i === 0 ? " active" : "");
    btn.textContent = nama;
    btn.addEventListener("click", () => {
      tabs
        .querySelectorAll(".nav-link")
        .forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      body.innerHTML = isi;
    });
    li.appendChild(btn);
    tabs.appendChild(li);
  });

  body.innerHTML = Object.values(INTRO)[0]; // tab pertama tampil lebih dulu
}

/* ---------- 3.2 Tiga tahap mitigasi ---------- */
function renderTahap() {
  $("tahap").innerHTML = TAHAP_MITIGASI.map(
    (t) => `
    <div class="col-lg-4">
      <div class="tahap">
        <div class="ic"><i class="bi ${t.ikon}"></i></div>
        <h3 class="h4">${t.judul}</h3>
        ${ul(t.langkah)}
      </div>
    </div>`,
  ).join("");
}

/* ---------- 3.3 Checklist tas siaga (disimpan di localStorage) ---------- */
const CK_KEY = "simb-ck";

function bacaChecklistTersimpan() {
  try {
    const data = JSON.parse(localStorage.getItem(CK_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return []; // localStorage diblokir / data rusak -> mulai dari kosong
  }
}

function perbaruiChecklist() {
  const kotak = [...document.querySelectorAll("#ckList input")];
  const dicentang = kotak.filter((x) => x.checked).length;

  $("ckBar").style.width = `${(dicentang / CHECKLIST_TAS_SIAGA.length) * 100}%`;
  $("ckText").textContent =
    `${dicentang} dari ${CHECKLIST_TAS_SIAGA.length} item sudah disiapkan`;

  try {
    const indeks = kotak.flatMap((x, i) => (x.checked ? [i] : []));
    localStorage.setItem(CK_KEY, JSON.stringify(indeks));
  } catch {
    /* abaikan: fitur simpan hanya pelengkap */
  }
}

function renderChecklist() {
  const tersimpan = bacaChecklistTersimpan();

  CHECKLIST_TAS_SIAGA.forEach((teks, i) => {
    const kolom = document.createElement("div");
    kolom.className = "col-md-6";
    kolom.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="ck${i}" ${tersimpan.includes(i) ? "checked" : ""}>
        <label class="form-check-label" for="ck${i}">${teks}</label>
      </div>`;
    kolom.querySelector("input").addEventListener("change", perbaruiChecklist);
    $("ckList").appendChild(kolom);
  });

  perbaruiChecklist();
}

/* ---------- 3.4 Berita (lokal + Google News RSS) ---------- */
const NEWS_QUERY = "(banjir) (DIY OR Yogyakarta) when:7d";
const NEWS_REFRESH_MS = 15 * 60 * 1000; // 15 menit
const NEWS_TIMEOUT_MS = 10 * 1000; // batalkan bila layanan feed tidak menjawab
const NEWS_MAX_ITEM = 12;
const EXCERPT_MAX = 150;

const beritaLokal = (window.BERITA || []).map((b) => ({
  ...b,
  jenis: "Lokal",
}));
const berita = {
  semua: beritaLokal.slice(), // daftar yang sedang dipakai (lokal, atau feed + lokal)
  kategori: "Semua", // filter kategori aktif
  kata: "", // kata kunci pencarian (huruf kecil)
  sedangMemuat: false,
};

const kategoriDari = (a) => a.kategori || "Berita";
const urutTerbaru = (a, b) => (b.tanggal || "").localeCompare(a.tanggal || "");

function renderFilter() {
  const daftar = ["Semua", ...new Set(berita.semua.map(kategoriDari))];
  // Bila kategori aktif hilang setelah pembaruan feed, kembali ke "Semua"
  if (!daftar.includes(berita.kategori)) berita.kategori = "Semua";

  const wadah = $("filter");
  wadah.innerHTML = "";
  daftar.forEach((nama) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn" + (nama === berita.kategori ? " on" : "");
    btn.textContent = nama;
    btn.addEventListener("click", () => {
      berita.kategori = nama;
      renderBerita();
    });
    wadah.appendChild(btn);
  });
}

function kartuBerita(a) {
  const tanggal = a.tanggal ? new Date(`${a.tanggal}T00:00:00`) : new Date();
  const kategori = kategoriDari(a);
  const ikon = a.ikon || IKON_KATEGORI[kategori] || "bi-newspaper";
  // Rapatkan baris baru / spasi ganda, lalu potong untuk cuplikan
  const isi = (
    a.isi ||
    a.deskripsi ||
    "Buka tautan untuk membaca informasi selengkapnya."
  )
    .replace(/\s+/g, " ")
    .trim();
  const cuplikan =
    isi.slice(0, EXCERPT_MAX) + (isi.length > EXCERPT_MAX ? "…" : "");
  const url = urlAman(a.url);

  const aksi = url
    ? `<a class="btn btn-brand btn-sm" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Baca berita asli <i class="bi bi-box-arrow-up-right ms-1"></i></a>`
    : '<span class="small text-secondary">Artikel edukasi SIMB DIY</span>';
  const sumber = a.sumber
    ? `<div class="small text-secondary mt-2">Sumber: ${escapeHTML(a.sumber)}</div>`
    : "";

  return `
    <div class="col-md-6 col-lg-4">
      <article class="art">
        <div class="th"><i class="bi ${escapeHTML(ikon)}"></i></div>
        <div class="bd d-flex flex-column">
          <small>${escapeHTML(kategori)} · ${formatTanggal(tanggal)}</small>
          <h5>${escapeHTML(a.judul || "Berita terbaru")}</h5>
          <p>${escapeHTML(cuplikan)}</p>
          <div class="mt-3 pt-2">${aksi}${sumber}</div>
        </div>
      </article>
    </div>`;
}

function renderKartu() {
  const tampil = berita.semua.filter((a) => {
    const cocokKategori =
      berita.kategori === "Semua" || kategoriDari(a) === berita.kategori;
    const teks = `${a.judul || ""} ${a.isi || ""}`.toLowerCase();
    return cocokKategori && teks.includes(berita.kata);
  });

  $("artList").innerHTML = tampil.length
    ? tampil.map(kartuBerita).join("")
    : '<p class="text-secondary">Belum ada berita yang cocok.</p>';
}

function renderBerita() {
  renderFilter();
  renderKartu();
}

// Mengubah satu item hasil rss2json menjadi format berita yang dipakai situs
function itemFeedKeBerita(item) {
  const link = item.link || item.guid || "";
  let penerbit = "Media berita";
  try {
    penerbit = new URL(link).hostname.replace(/^www\./, "");
  } catch {
    /* link tidak valid: pakai nama bawaan */
  }
  const tgl = new Date(item.pubDate || Date.now());

  return {
    kategori: "Berita terbaru",
    ikon: "bi-newspaper",
    // Judul Google News berakhiran " - Nama Media"; bagian itu dibuang karena sudah ada di "sumber"
    judul: (item.title || "").replace(/\s+-\s+[^-]+$/, "").trim(),
    isi: (item.description || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    tanggal: toISODate(isNaN(tgl) ? new Date() : tgl),
    sumber: penerbit,
    url: link,
    jenis: "Feed",
  };
}

// Gabungkan feed + lokal, buang duplikat.
// Berita feed dibedakan lewat url; berita lokal lewat judul, karena beberapa berita lokal
// sengaja memakai url sumber yang sama (mis. bpbd.jogjaprov.go.id).
function gabungTanpaDuplikat(...kelompok) {
  const terlihat = new Set();
  return kelompok.flat().filter((a) => {
    const kunci = (a.jenis === "Feed" ? a.url : a.judul).toLowerCase();
    if (terlihat.has(kunci)) return false;
    terlihat.add(kunci);
    return true;
  });
}

async function refreshNews() {
  if (berita.sedangMemuat) return; // cegah permintaan tumpang tindih
  berita.sedangMemuat = true;

  const status = $("newsStatus");
  const tombol = $("refreshNews");
  tombol.disabled = true;
  status.textContent = "Sedang mencari berita terbaru…";

  // Browser tidak boleh membaca RSS lintas-domain langsung, jadi lewat jembatan rss2json
  const rss = `https://news.google.com/rss/search?q=${encodeURIComponent(NEWS_QUERY)}&hl=id&gl=ID&ceid=ID:id`;
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;

  const pengendali = new AbortController();
  const timer = setTimeout(() => pengendali.abort(), NEWS_TIMEOUT_MS);

  try {
    const respons = await fetch(endpoint, {
      cache: "no-store",
      signal: pengendali.signal,
    });
    if (!respons.ok) throw new Error("Layanan feed tidak merespons");

    const data = await respons.json();
    if (data.status !== "ok" || !Array.isArray(data.items))
      throw new Error("Format feed tidak sesuai");

    const baru = data.items
      .slice(0, NEWS_MAX_ITEM)
      .map(itemFeedKeBerita)
      .filter((a) => a.judul && a.url);
    if (!baru.length) throw new Error("Belum ada artikel terbaru dari feed");

    berita.semua = gabungTanpaDuplikat(baru, beritaLokal).sort(urutTerbaru);
    renderBerita();

    const jam = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    status.textContent = `Diperbarui ${jam} · ${baru.length} berita terbaru ditemukan`;
  } catch {
    // Gagal (jaringan / CORS / timeout): tetap tampilkan berita lokal
    berita.semua = beritaLokal.slice().sort(urutTerbaru);
    renderBerita();
    status.textContent =
      "Feed berita belum dapat diakses. Menampilkan artikel lokal; coba perbarui lagi nanti.";
  } finally {
    clearTimeout(timer);
    tombol.disabled = false;
    berita.sedangMemuat = false;
  }
}

function initBerita() {
  $("cari").addEventListener("input", (e) => {
    berita.kata = e.target.value.trim().toLowerCase();
    renderKartu(); // cukup gambar ulang kartu; tombol filter tidak berubah
  });
  $("refreshNews").addEventListener("click", refreshNews);

  renderBerita(); // tampilkan berita lokal dulu agar halaman tidak kosong
  refreshNews(); // lalu coba ambil berita terbaru
  setInterval(() => {
    if (!document.hidden) refreshNews(); // lewati bila tab sedang tidak dilihat
  }, NEWS_REFRESH_MS);
}

/* ---------- 3.5 Statistik (grafik batang) ---------- */
function renderStatistik() {
  // Grafik kolom: tinggi dihitung relatif terhadap nilai terbesar.
  // Tinggi awal 0; animasi ke tinggi akhir dijalankan oleh initAnimasi().
  const maksTahunan = Math.max(...BENCANA_PER_TAHUN.map((d) => d.jumlah));
  $("chart").innerHTML = BENCANA_PER_TAHUN.map((d) => {
    const persen = (d.jumlah / (maksTahunan * 1.05)) * 100; // sisakan ruang di atas kolom tertinggi
    return `<div>${d.jumlah.toLocaleString("id-ID")}<span data-h="${persen.toFixed(1)}" style="height:0"></span>${d.tahun}</div>`;
  }).join("");

  // Grafik batang horizontal per kabupaten/kota
  const maksWilayah = Math.max(...BANJIR_DES_2025.map((d) => d.jumlah));
  $("bars").innerHTML = BANJIR_DES_2025.map(
    (d) => `
    <div class="bar-row">
      <span>${d.wilayah}</span><b>${d.jumlah}</b>
      <div class="tr"><i style="width:${(d.jumlah / maksWilayah) * 100}%"></i></div>
    </div>`,
  ).join("");
}

/* ---------- 3.6 FAQ, sumber resmi, kontak darurat ---------- */
function renderFAQ() {
  $("faq").innerHTML = FAQ.map((f, i) => {
    const pertama = i === 0; // item pertama terbuka
    return `
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button class="accordion-button${pertama ? "" : " collapsed"}" type="button"
          data-bs-toggle="collapse" data-bs-target="#f${i}"
          aria-expanded="${pertama}" aria-controls="f${i}">${f.tanya}</button>
      </h3>
      <div id="f${i}" class="accordion-collapse collapse${pertama ? " show" : ""}" data-bs-parent="#faq">
        <div class="accordion-body text-secondary">${f.jawab}</div>
      </div>
    </div>`;
  }).join("");
}

function renderSumber() {
  $("sumber").innerHTML = SUMBER_RESMI.map(
    (s) => `
    <a class="src" href="${s.url}" target="_blank" rel="noopener">
      <i class="bi ${s.ikon} l"></i>
      <div><h6>${s.nama}</h6><p>${s.ket}</p></div>
      <i class="bi bi-box-arrow-up-right ms-auto text-secondary"></i>
    </a>`,
  ).join("");
}

function renderKontak() {
  $("kontakList").innerHTML = KONTAK_DARURAT.map(
    (k) => `
    <div class="col-md-6 col-lg-4">
      <div class="kontak">
        <div class="ic"><i class="bi ${k.ikon}"></i></div>
        <div><h6>${k.nama}</h6><p>${k.ket}</p></div>
        <a class="no" href="tel:${k.nomor}">${k.nomor}</a>
      </div>
    </div>`,
  ).join("");
}

/* ---------- 3.7 Animasi saat elemen masuk layar ---------- */
const DURASI_HITUNG_MS = 1200;

// Menghitung angka dari 0 sampai target (elemen punya atribut data-count)
function animasiAngka(el) {
  const target = Number(el.dataset.count);
  if (prefersReducedMotion) {
    el.textContent = target.toLocaleString("id-ID");
    return;
  }
  const mulai = performance.now();
  const langkah = (sekarang) => {
    const progres = Math.min((sekarang - mulai) / DURASI_HITUNG_MS, 1);
    el.textContent = Math.round(target * progres).toLocaleString("id-ID");
    if (progres < 1) requestAnimationFrame(langkah);
  };
  requestAnimationFrame(langkah);
}

function initAnimasi() {
  const pengamat = new IntersectionObserver(
    (entri) => {
      entri.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        pengamat.unobserve(el); // animasi cukup sekali
        if (el.dataset.count) animasiAngka(el);
        if (el.dataset.h) el.style.height = `${el.dataset.h}%`; // kolom grafik "naik" lewat transisi CSS
      });
    },
    { threshold: 0.4 }, // jalankan saat 40% elemen terlihat
  );
  document
    .querySelectorAll("[data-count],[data-h]")
    .forEach((el) => pengamat.observe(el));
}

/* ---------- 3.8 Peta (Leaflet) ---------- */
function initPeta() {
  if (!window.L) return;

  var map = L.map("map").setView([-7.7956, 110.3695], 11);

  
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution:
      '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  setTimeout(function () {
    map.invalidateSize();
  }, 200);

  // Lingkaran per wilayah: makin banyak kejadian, makin besar
  if (typeof BANJIR_DES_2025 !== "undefined") {
    BANJIR_DES_2025.forEach((d) =>
      L.circleMarker([d.lat, d.lng], {
        radius: 8 + d.jumlah * 1.1,
        color: "#1b4b8f",
        fillColor: "#7cc4ff",
        fillOpacity: 0.6,
      })
        .addTo(map) 
        .bindPopup(
          `<b>${d.wilayah}</b><br>${d.jumlah} kejadian banjir (Desember 2025)`,
        ),
    );
  }

  L.marker([-7.9355, 110.39])
    .addTo(map)
    .bindPopup(
      "<b>Imogiri, Bantul</b><br>Masuk peta rawan banjir BPBD DIY 2025",
    );

  L.marker([-7.789, 110.389])
    .addTo(map) 
    .bindPopup(
      "<b>BPBD DIY (Pusdalops)</b><br>Jl. Kenari No. 14A, Semaki (perkiraan lokasi)",
    );
}

/* ---------- 3.9 Peringatan dini (diatur di data/berita.js) ---------- */
const LEVEL_PERINGATAN = ["waspada", "siaga", "awas"];

function renderPeringatan() {
  const p = window.PERINGATAN;
  if (!p || !p.aktif) return;

  // Level di luar daftar dianggap "waspada" supaya nama class CSS selalu valid
  const level = LEVEL_PERINGATAN.includes(p.level) ? p.level : "waspada";
  const url = urlAman(p.url);

  $("alertBar").className = `alert-bar lv-${level}`;
  $("alertBar").innerHTML = `
    <div class="container">
      <b><i class="bi bi-exclamation-triangle-fill me-1"></i>${level.toUpperCase()}</b>
      ${escapeHTML(p.judul)}
      <span class="d-none d-md-inline">${escapeHTML(p.pesan)}</span>
      ${url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">Selengkapnya</a>` : ""}
    </div>`;
}

/* ---------- 3.10 Lapor banjir -> WhatsApp BPBD DIY ---------- */
function initLapor() {
  // Tombol GPS: isi kolom lokasi dengan tautan Google Maps
  $("gps").addEventListener("click", () => {
    if (!navigator.geolocation) return alert("Browser tidak mendukung lokasi.");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        $("lokasi").value =
          `https://maps.google.com/?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`;
      },
      () => alert("Lokasi tidak bisa diambil. Ketik manual saja."),
      { timeout: 10000 },
    );
  });

  // Kirim: susun pesan, lalu buka WhatsApp dengan teks yang sudah terisi
  $("lapor-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const pesan = [
      "Lapor banjir (via Siaga Banjir DIY)",
      `Kab/kota: ${f.get("kab")}`,
      `Lokasi: ${f.get("lokasi")}`,
      `Tinggi air: ${f.get("tinggi")}`,
      `Kondisi: ${f.get("kondisi") || "-"}`,
      `Pelapor: ${f.get("nama") || "-"}`,
    ].join("\n");

    window.open(
      `https://wa.me/${NOMOR_WA_BPBD}?text=${encodeURIComponent(pesan)}`,
      "_blank",
      "noopener",
    );
  });
}

/* =============================================================
   4. INISIALISASI
   Urutan penting: renderStatistik() harus jalan SEBELUM initAnimasi(),
   karena animasi mencari elemen [data-h] yang dibuat oleh renderStatistik().
   ============================================================= */
renderPeringatan();
renderIntro();
renderTahap();
renderChecklist();
initBerita();
renderStatistik();
renderFAQ();
renderSumber();
renderKontak();
initAnimasi();
initPeta();
initLapor();
