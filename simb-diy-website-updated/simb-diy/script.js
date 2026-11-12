const $=id=>document.getElementById(id),modal=new bootstrap.Modal($('modal'));
const open=(t,h)=>{$('mTitle').textContent=t;$('mBody').innerHTML=h;modal.show()};
const ul=a=>'<ul>'+a.map(x=>`<li>${x}</li>`).join('')+'</ul>';

/* 1. MENGENAL BANJIR */
const intro={
'Pengertian':'<p class="mb-0">Banjir adalah meluapnya air yang menggenangi daratan yang biasanya kering, karena air sungai, laut, atau hujan melebihi kapasitas penyerapan tanah dan penyaluran saluran air. Banjir menjadi bencana dengan jumlah kejadian tertinggi di Indonesia setiap tahun.</p>',
'Jenis':ul(['<b>Banjir sungai:</b> sungai meluap setelah hujan lebat di hulu atau sekitar','<b>Banjir bandang:</b> arus deras tiba-tiba, sering membawa lumpur dan batang kayu','<b>Banjir genangan:</b> air tertahan karena drainase buruk, umum di perkotaan','<b>Banjir rob:</b> air laut pasang menggenangi daratan pesisir']),
'Penyebab':ul(['Curah hujan tinggi dan berlangsung lama','Sungai dan drainase dangkal akibat sedimen dan sampah','Hilangnya hutan dan daerah resapan air','Pasang air laut dan penurunan muka tanah','Tanggul atau bendungan rusak']),
'Di DIY':ul(['Banjir di DIY umumnya berupa genangan dan luapan sungai yang muncul bersama cuaca ekstrem','Kota Yogyakarta padat permukiman di sekitar sungai; prakiraan BMKG musim hujan 2022 menilai potensi banjir sedang di Kota Yogyakarta dan Gunungkidul bagian timur','Kulon Progo dan Gunungkidul juga rawan tanah longsor di wilayah perbukitan','Lima wilayah siaga: Kota Yogyakarta, Sleman, Bantul, Kulon Progo, dan Gunungkidul']),
'Dampak':ul(['Korban jiwa, luka, dan warga mengungsi','Rumah, jalan, sekolah, dan fasilitas umum rusak','Lahan pertanian dan usaha terganggu','Penyakit: diare, leptospirosis, penyakit kulit, ISPA'])};
Object.keys(intro).forEach((k,i)=>{const li=document.createElement('li'),b=document.createElement('button');b.className='nav-link'+(i?'':' active');b.textContent=k;
b.onclick=()=>{document.querySelectorAll('#introTabs .nav-link').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('introBody').innerHTML=intro[k]};li.appendChild(b);$('introTabs').appendChild(li)});
$('introBody').innerHTML=intro['Pengertian'];

/* 2. TAHAP MITIGASI */
$('tahap').innerHTML=[
['bi-house-check','Sebelum banjir',['Bersihkan saluran air dan selokan secara rutin','Buat sumur resapan atau biopori di halaman','Kenali jalur dan titik evakuasi terdekat','Siapkan tas siaga dan simpan dokumen di wadah kedap air','Pantau peringatan cuaca BMKG dan info BPBD']],
['bi-exclamation-triangle','Saat banjir',['Matikan listrik dan gas, cabut peralatan elektronik','Evakuasi ke tempat tinggi, dahulukan anak, lansia, dan difabel','Jangan berjalan atau berkendara melewati arus deras','Hindari kontak langsung dengan air banjir','Hubungi 117 atau 112 bila butuh bantuan']],
['bi-heart-pulse','Setelah banjir',['Pastikan bangunan aman sebelum masuk kembali','Bersihkan dan desinfeksi rumah serta peralatan','Gunakan sepatu boot dan sarung tangan saat membersihkan','Waspadai diare, leptospirosis, dan penyakit kulit','Dokumentasikan kerusakan untuk pengajuan bantuan']]]
.map(t=>`<div class="col-lg-4"><div class="tahap"><div class="ic"><i class="bi ${t[0]}"></i></div><h4>${t[1]}</h4>${ul(t[2])}</div></div>`).join('');

/* 3. CHECKLIST */
const items=['Dokumen penting dalam plastik kedap air','Senter dan baterai cadangan','Obat pribadi dan perlengkapan P3K','Makanan tahan lama','Air minum (cukup untuk 3 hari)','Pakaian ganti dan jas hujan','Power bank dan charger','Radio kecil bertenaga baterai','Uang tunai secukupnya','Peluit','Masker dan sabun','Selimut dan alas tidur'];
let saved=[];try{saved=JSON.parse(localStorage.getItem('simb-ck')||'[]')}catch(e){}
function upd(){const c=[...document.querySelectorAll('#ckList input')],n=c.filter(x=>x.checked).length;
$('ckBar').style.width=n/items.length*100+'%';$('ckText').textContent=`${n} dari ${items.length} item sudah disiapkan`;
try{localStorage.setItem('simb-ck',JSON.stringify(c.map((x,i)=>x.checked?i:-1).filter(i=>i>=0)))}catch(e){}}
items.forEach((t,i)=>{const d=document.createElement('div');d.className='col-md-6';
d.innerHTML=`<div class="form-check"><input class="form-check-input" type="checkbox" id="ck${i}" ${saved.includes(i)?'checked':''}><label class="form-check-label" for="ck${i}">${t}</label></div>`;
d.querySelector('input').onchange=upd;$('ckList').appendChild(d)});upd();

/* 4. BERITA TERBARU */
const tgl=d=>new Date(d).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
const escapeHTML=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const localNews=(window.BERITA||[]).map(b=>({...b,jenis:'Lokal'}));
let newsItems=localNews.slice(),cur='Semua',q='';
function renderNews(){
 const categories=['Semua',...new Set(newsItems.map(a=>a.kategori||'Berita'))];
 $('filter').innerHTML='';
 $('artList').innerHTML='';
 categories.forEach(c=>{const b=document.createElement('button');b.className='filter-btn'+(c===cur?' on':'');b.textContent=c;b.onclick=()=>{cur=c;renderNews()};$('filter').appendChild(b)});
 const shown=newsItems.filter(a=>(cur==='Semua'||(a.kategori||'Berita')===cur)&&((a.judul||'')+' '+(a.isi||'')).toLowerCase().includes(q));
 shown.forEach(a=>{
  const d=document.createElement('div');d.className='col-md-6 col-lg-4';
  const date=a.tanggal?new Date(a.tanggal+'T00:00:00'):new Date();
  const excerpt=(a.isi||a.deskripsi||'Buka tautan untuk membaca informasi selengkapnya.');
  d.innerHTML=`<article class="art">
   <div class="th"><i class="bi ${escapeHTML(a.ikon||'bi-newspaper')}"></i></div>
   <div class="bd d-flex flex-column">
    <small>${escapeHTML(a.kategori||'Berita')} · ${tgl(date)}</small>
    <h5>${escapeHTML(a.judul||'Berita terbaru')}</h5>
    <p>${escapeHTML(excerpt.slice(0,150))}${excerpt.length>150?'…':''}</p>
    <div class="mt-3 pt-2">
     ${a.url?`<a class="btn btn-brand btn-sm" href="${escapeHTML(a.url)}" target="_blank" rel="noopener noreferrer">Baca berita asli <i class="bi bi-box-arrow-up-right ms-1"></i></a>`:'<span class="small text-secondary">Artikel edukasi SIMB DIY</span>'}
     ${a.sumber?`<div class="small text-secondary mt-2">Sumber: ${escapeHTML(a.sumber)}</div>`:''}
    </div>
   </div></article>`;
  $('artList').appendChild(d);
 });
 if(!shown.length)$('artList').innerHTML='<p class="text-secondary">Belum ada berita yang cocok.</p>';
}
$('cari').oninput=e=>{q=e.target.value.trim().toLowerCase();renderNews()};

async function refreshNews(){
 const status=$('newsStatus'),btn=$('refreshNews');
 btn.disabled=true;status.textContent='Sedang mencari berita terbaru…';
 // Google News RSS query. rss2json digunakan sebagai jembatan karena browser statis
 // tidak dapat membaca RSS lintas-domain secara langsung.
 const rss='https://news.google.com/rss/search?q='+encodeURIComponent('(banjir OR bencana OR cuaca ekstrem) (DIY OR Yogyakarta) when:7d')+'&hl=id&gl=ID&ceid=ID:id';
 const endpoint='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(rss);
 try{
  const response=await fetch(endpoint,{cache:'no-store'});
  if(!response.ok)throw new Error('Layanan feed tidak merespons');
  const payload=await response.json();
  if(payload.status!=='ok'||!Array.isArray(payload.items))throw new Error('Format feed tidak sesuai');
  const fresh=payload.items.slice(0,12).map(item=>{
   const title=(item.title||'').replace(/\s+-\s+[^-]+$/,'').trim();
   const link=item.link||item.guid||'';
   let publisher='Media berita';
   try{publisher=new URL(link).hostname.replace(/^www\./,'')}catch(e){}
   const date=new Date(item.pubDate||Date.now());
   return {kategori:'Berita terbaru',ikon:'bi-newspaper',judul:title,isi:(item.description||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(),tanggal:isNaN(date)?new Date().toISOString().slice(0,10):date.toISOString().slice(0,10),sumber:publisher,url:link,jenis:'Feed'};
  }).filter(a=>a.judul&&a.url);
  if(!fresh.length)throw new Error('Belum ada artikel terbaru dari feed');
  const seen=new Set();
  newsItems=[...fresh,...localNews].filter(a=>{const key=(a.url||a.judul).toLowerCase();if(seen.has(key))return false;seen.add(key);return true});
  newsItems.sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));
  renderNews();
  status.textContent=`Diperbarui ${new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})} · ${fresh.length} berita terbaru ditemukan`;
 }catch(err){
  newsItems=localNews.slice().sort((a,b)=>(b.tanggal||'').localeCompare(a.tanggal||''));
  renderNews();
  status.textContent='Feed berita belum dapat diakses. Menampilkan artikel lokal; coba perbarui lagi nanti.';
 }finally{btn.disabled=false}
}
$('refreshNews').addEventListener('click',refreshNews);
renderNews();
refreshNews();
setInterval(refreshNews,15*60*1000);

/* 5. STATISTIK DIY (BPBD DIY) */
const yr=[['2021',958],['2022',1817],['2023',1418]];
$('chart').innerHTML=yr.map(y=>`<div>${y[1].toLocaleString('id-ID')}<span data-h="${y[1]/1900*100}" style="height:0"></span>${y[0]}</div>`).join('');
$('bars').innerHTML=[['Bantul',22],['Gunungkidul',13],['Kulon Progo',5],['Kota Yogyakarta',1],['Sleman',0]]
.map(p=>`<div class="bar-row"><span>${p[0]}</span><b>${p[1]}</b><div class="tr"><i style="width:${p[1]/22*100}%"></i></div></div>`).join('');

/* 6. FAQ, SUMBER, KONTAK */
const faq=[['Apa yang harus dilakukan pertama kali saat air naik?','Matikan listrik dan gas, amankan dokumen penting, lalu segera menuju tempat yang lebih tinggi sesuai arahan petugas.'],
['Bolehkah menerobos banjir dengan kendaraan?','Tidak. Air yang tampak dangkal pun dapat menyembunyikan lubang atau arus kuat, dan dapat membuat kendaraan mogok atau hanyut. Cari jalur lain.'],
['Kapan sebaiknya mengungsi?','Saat status Siaga atau Awas, atau ketika petugas menginstruksikan evakuasi. Lebih baik berangkat lebih awal daripada terlambat.'],
['Bagaimana mencegah penyakit pascabanjir?','Gunakan alas kaki, cuci tangan dengan sabun, minum air matang, dan bersihkan rumah dengan desinfektan. Periksa ke fasilitas kesehatan bila sakit.'],
['Ke mana melapor banjir di DIY?','Hubungi Pusdalops BPBD DIY di (0274) 555584 atau WhatsApp 0852-1286-3744, BPBD kabupaten/kota Anda, atau panggilan darurat 112 dan BNPB 117. Sebutkan lokasi lengkap dan kondisi yang terjadi.']];
$('faq').innerHTML=faq.map((f,i)=>`<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${i?'collapsed':''}" data-bs-toggle="collapse" data-bs-target="#f${i}">${f[0]}</button></h3><div id="f${i}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#faq"><div class="accordion-body text-secondary">${f[1]}</div></div></div>`).join('');
$('sumber').innerHTML=[['BPBD DIY','Pusdalops dan informasi kebencanaan DIY','https://bpbd.jogjaprov.go.id','bi-geo-alt'],['BNPB','Badan Nasional Penanggulangan Bencana','https://bnpb.go.id','bi-shield-check'],['DIBI BNPB','Data Informasi Bencana Indonesia','https://dibi.bnpb.go.id','bi-bar-chart'],['BMKG','Prakiraan cuaca dan peringatan dini','https://www.bmkg.go.id','bi-cloud-rain-heavy'],['InaRISK','Peta risiko bencana BNPB','https://inarisk.bnpb.go.id','bi-map']]
.map(s=>`<a class="src" href="${s[2]}" target="_blank" rel="noopener"><i class="bi ${s[3]} l"></i><div><h6>${s[0]}</h6><p>${s[1]}</p></div><i class="bi bi-box-arrow-up-right ms-auto text-secondary"></i></a>`).join('');
$('kontakList').innerHTML=[['Panggilan Darurat','Layanan darurat terpadu','112','bi-broadcast'],['BNPB','Penanggulangan bencana','117','bi-shield-check'],['Basarnas','Pencarian dan pertolongan','115','bi-life-preserver'],['Ambulans','Gawat darurat medis','119','bi-heart-pulse'],['Polisi','Keamanan dan evakuasi','110','bi-person-badge'],['Damkar','Pemadam dan penyelamatan','113','bi-fire'],['PLN','Gangguan listrik','123','bi-lightning-charge']]
.map(k=>`<div class="col-md-6 col-lg-4"><div class="kontak"><div class="ic"><i class="bi ${k[3]}"></i></div><div><h6>${k[0]}</h6><p>${k[1]}</p></div><a class="no" href="tel:${k[2]}">${k[2]}</a></div></div>`).join('');

/* ANIMASI */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);
if(el.dataset.count){const t=+el.dataset.count,d=+(el.dataset.dec||0),s=performance.now();(function f(n){const p=Math.min((n-s)/1200,1);el.textContent=(t*p).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d});if(p<1)requestAnimationFrame(f)})(s)}
if(el.dataset.h)el.style.height=el.dataset.h+'%'}),{threshold:.4});
document.querySelectorAll('[data-count],[data-h]').forEach(el=>io.observe(el));

/* PETA DIY (perkiraan titik pusat wilayah) */
if(window.L){const m=L.map('map',{scrollWheelZoom:false}).setView([-7.88,110.38],10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap'}).addTo(m);
[['Bantul',-7.888,110.329,22],['Gunungkidul',-7.964,110.605,13],['Kulon Progo',-7.857,110.160,5],['Kota Yogyakarta',-7.797,110.370,1],['Sleman',-7.716,110.356,0]]
.forEach(d=>L.circleMarker([d[1],d[2]],{radius:8+d[3]*1.1,color:'#1b4b8f',fillColor:'#7cc4ff',fillOpacity:.6}).addTo(m).bindPopup(`<b>${d[0]}</b><br>${d[3]} kejadian banjir (Desember 2025)`));
L.marker([-7.9355,110.39]).addTo(m).bindPopup('<b>Imogiri, Bantul</b><br>Masuk peta rawan banjir BPBD DIY 2025');
L.marker([-7.789,110.389]).addTo(m).bindPopup('<b>BPBD DIY (Pusdalops)</b><br>Jl. Kenari No. 14A, Semaki (perkiraan lokasi)')}


/* CARI BERITA */
$('cari').oninput=e=>{q=e.target.value.trim().toLowerCase();draw()};

/* PERINGATAN DINI (diatur di data/berita.js) */
const warn=window.PERINGATAN;
if(warn&&warn.aktif){$('alertBar').className='alert-bar lv-'+warn.level;
$('alertBar').innerHTML=`<div class="container"><b><i class="bi bi-exclamation-triangle-fill me-1"></i>${warn.level.toUpperCase()}</b> ${warn.judul} <span class="d-none d-md-inline">${warn.pesan}</span>`+(warn.url?` <a href="${warn.url}" target="_blank" rel="noopener">Selengkapnya</a>`:'')+'</div>'}

/* LAPOR BANJIR -> WhatsApp BPBD DIY */
$('gps').onclick=()=>{if(!navigator.geolocation)return alert('Browser tidak mendukung lokasi.');
navigator.geolocation.getCurrentPosition(p=>{$('lokasi').value=`https://maps.google.com/?q=${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}`},()=>alert('Lokasi tidak bisa diambil. Ketik manual saja.'))};
$('lapor-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
const t=`Lapor banjir (via SIMB DIY)\nKab/kota: ${f.get('kab')}\nLokasi: ${f.get('lokasi')}\nTinggi air: ${f.get('tinggi')}\nKondisi: ${f.get('kondisi')||'-'}\nPelapor: ${f.get('nama')||'-'}`;
window.open('https://wa.me/6285212863744?text='+encodeURIComponent(t),'_blank','noopener')};
