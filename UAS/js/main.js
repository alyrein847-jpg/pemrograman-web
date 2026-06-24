function tampilkanSalam() {
  var sekarang = new Date();
  var jam = sekarang.getHours();
  var salam = '';

  if (jam >= 5 && jam < 12) {
    salam = '🌅 Selamat Pagi! ';
  } else if (jam >= 12 && jam < 18) {
    salam = '☀️ Selamat Siang! ';
  } else {
    salam = '🌙 Selamat Malam! ';
  }

  var hariArr = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  var bulanArr = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  var hari = hariArr[sekarang.getDay()];
  var tgl = sekarang.getDate();
  var bln = bulanArr[sekarang.getMonth()];
  var thn = sekarang.getFullYear();

  var jam2 = String(sekarang.getHours()).padStart(2,'0');
  var menit = String(sekarang.getMinutes()).padStart(2,'0');

  var greetingEl = document.getElementById('greeting-bar');
  if (greetingEl) {
    greetingEl.innerHTML = salam + '<strong>' + hari + ', ' + tgl + ' ' + bln + ' ' + thn + '</strong> &mdash; Pukul <strong>' + jam2 + ':' + menit + '</strong>';
  }
}

var dataKegiatan = [
  {
    id: 1,
    judul: 'Dasar UI/UX',
    kategori: 'desain',
    tanggal: '10 Juli 2026',
    kuota: 30,
    img: 'img/workshop1.jpg',
    alt: 'Workshop Dasar UI/UX',
    detail: 'Materi meliputi user flow, wireframe, dan evaluasi antarmuka sederhana.'
  },
  {
    id: 2,
    judul: 'JavaScript Dasar',
    kategori: 'pemrograman',
    tanggal: '12 Juli 2026',
    kuota: 25,
    img: 'img/workshop2.jpg',
    alt: 'Workshop JavaScript Dasar',
    detail: 'Latihan variabel, fungsi, event, dan manipulasi DOM.'
  },
  {
    id: 3,
    judul: 'Bootstrap Responsif',
    kategori: 'pemrograman',
    tanggal: '15 Juli 2026',
    kuota: 35,
    img: 'img/workshop3.jpg',
    alt: 'Workshop Bootstrap Responsif',
    detail: 'Menyusun grid, navbar, card, form, dan komponen interaktif.'
  },
  {
    id: 4,
    judul: 'Fotografi Produk',
    kategori: 'kreatif',
    tanggal: '18 Juli 2026',
    kuota: 20,
    img: 'img/workshop4.jpg',
    alt: 'Workshop Fotografi Produk',
    detail: 'Teknik pencahayaan dan komposisi foto untuk promosi digital.'
  },
  {
    id: 5,
    judul: 'Prototipe dengan Figma',
    kategori: 'desain',
    tanggal: '20 Juli 2026',
    kuota: 30,
    img: 'img/workshop5.jpg',
    alt: 'Workshop Prototipe dengan Figma',
    detail: 'Membuat komponen, prototipe interaktif, dan presentasi desain.'
  },
  {
    id: 6,
    judul: 'Strategi Konten Digital',
    kategori: 'kreatif',
    tanggal: '22 Juli 2026',
    kuota: 40,
    img: 'img/workshop6.jpg',
    alt: 'Workshop Strategi Konten Digital',
    detail: 'Menyusun kalender konten dan pesan yang sesuai audiens.'
  }
];

var badgeMap = {
  desain: '<span class="badge-custom badge-desain">Desain</span>',
  pemrograman: '<span class="badge-custom badge-pemrograman">Pemrograman</span>',
  kreatif: '<span class="badge-custom badge-kreatif">Kreatif</span>'
};

function renderKegiatan(filter) {
  var container = document.getElementById('kegiatan-container');
  if (!container) return;

  var filtered = filter === 'semua'
    ? dataKegiatan
    : dataKegiatan.filter(function(k) { return k.kategori === filter; });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Tidak ada kegiatan untuk kategori ini.</p></div>';
    return;
  }

  var html = '';
  for (var i = 0; i < filtered.length; i++) {
    var k = filtered[i];
    html += '<div class="col-md-6 col-lg-4 mb-4 kegiatan-item" data-kategori="' + k.kategori + '">';
    html += '  <div class="kegiatan-card card">';
    html += '    <img src="' + k.img + '" class="card-img-top" alt="' + k.alt + '" onerror="this.src=\'img/placeholder.jpg\'">';
    html += '    <div class="card-body">';
    html += '      ' + badgeMap[k.kategori];
    html += '      <h5 class="card-title">' + k.judul + '</h5>';
    html += '      <p class="kegiatan-info"><i>📅</i> ' + k.tanggal + '</p>';
    html += '      <p class="kegiatan-info"><i>👥</i> Kuota: ' + k.kuota + ' peserta</p>';
    html += '      <button class="btn btn-sm btn-outline-primary mt-2" onclick="toggleDetail(' + k.id + ')">Detail</button>';
    html += '      <div id="detail-' + k.id + '" class="kegiatan-detail" style="display:none;">' + k.detail + '</div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  container.innerHTML = html;
}

function toggleDetail(id) {
  var el = document.getElementById('detail-' + id);
  if (el) {
    $(el).slideToggle(300);
  }
}

function initFilter() {
  var buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      buttons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      renderKegiatan(filter);
    });
  });

  renderKegiatan('semua');
}

var hargaWorkshop = {
  'dasar-uiux': 75000,
  'javascript-dasar': 80000,
  'bootstrap-responsif': 70000,
  'fotografi-produk': 90000,
  'prototipe-figma': 85000,
  'strategi-konten': 65000
};

var diskonKategori = {
  'mahasiswa': 0.20,
  'pelajar': 0.10,
  'umum': 0
};

var hargaFasilitas = {
  'sertifikat': 20000,
  'paket-konsumsi': 25000
};

function hitungBiaya() {
  var workshopEl = document.getElementById('pilihan-workshop');
  var kategoriEl = document.getElementById('kategori-peserta');
  if (!workshopEl || !kategoriEl) return;

  var workshop = workshopEl.value;
  var kategori = kategoriEl.value;

  var hargaBase = workshop ? (hargaWorkshop[workshop] || 0) : 0;
  var diskon = kategori ? (diskonKategori[kategori] || 0) : 0;
  var potongan = hargaBase * diskon;
  var hargaSetelahDiskon = hargaBase - potongan;

  var totalFasilitas = 0;
  var checkboxes = document.querySelectorAll('input[name="fasilitas"]:checked');
  checkboxes.forEach(function(cb) {
    totalFasilitas += hargaFasilitas[cb.value] || 0;
  });

  var total = hargaSetelahDiskon + totalFasilitas;

  var biayaEl = document.getElementById('biaya-total');
  if (biayaEl) {
    biayaEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
  }

  var noteEl = document.getElementById('biaya-note');
  if (noteEl) {
    if (diskon > 0) {
      noteEl.textContent = 'Diskon ' + (diskon * 100) + '% sedang diterapkan (potongan Rp ' + potongan.toLocaleString('id-ID') + ').';
      noteEl.style.display = 'block';
    } else {
      noteEl.style.display = 'none';
    }
  }

  var rincianEl = document.getElementById('biaya-rincian');
  if (rincianEl) {
    if (hargaBase > 0) {
      rincianEl.innerHTML =
        '<div class="d-flex justify-content-between small text-muted">' +
          '<span>Workshop' + (diskon > 0 ? ' (setelah diskon)' : '') + '</span>' +
          '<span>Rp ' + hargaSetelahDiskon.toLocaleString('id-ID') + '</span>' +
        '</div>' +
        '<div class="d-flex justify-content-between small text-muted">' +
          '<span>Fasilitas tambahan</span>' +
          '<span>Rp ' + totalFasilitas.toLocaleString('id-ID') + '</span>' +
        '</div>' +
        '<div class="d-flex justify-content-between fw-bold mt-1">' +
          '<span>Total</span>' +
          '<span>Rp ' + total.toLocaleString('id-ID') + '</span>' +
        '</div>';
    } else {
      rincianEl.innerHTML = '';
    }
  }

  return total;
}

function validasiForm(e) {
  if (e) e.preventDefault();

  var valid = true;

  hapusSemuaError();

  function tampilError(elId, pesan) {
    var el = document.getElementById(elId);
    if (el) {
      el.classList.add('field-error');
      var err = document.createElement('div');
      err.className = 'error-msg';
      err.textContent = pesan;
      el.parentNode.insertBefore(err, el.nextSibling);
    }
    valid = false;
  }

  var nama = document.getElementById('nama');
  if (!nama || nama.value.trim().length < 3) {
    tampilError('nama', 'Nama lengkap minimal 3 karakter.');
  }

  var nim = document.getElementById('nim');
  if (!nim || !/^\d{6,15}$/.test(nim.value.trim())) {
    tampilError('nim', 'NIM harus berupa angka (6–15 digit).');
  }

  var email = document.getElementById('email');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    tampilError('email', 'Format email tidak valid.');
  }

  var workshop = document.getElementById('pilihan-workshop');
  if (!workshop || workshop.value === '') {
    tampilError('pilihan-workshop', 'Silakan pilih workshop terlebih dahulu.');
  }

  var setuju = document.getElementById('setuju');
  if (!setuju || !setuju.checked) {
    tampilError('setuju', 'Anda harus menyetujui ketentuan pendaftaran.');
  }

  if (valid) {
    tampilRingkasan();
  }
}

function tampilRingkasan() {
  var nama = document.getElementById('nama').value.trim();
  var nim = document.getElementById('nim').value.trim();
  var email = document.getElementById('email').value.trim();
  var telepon = document.getElementById('telepon') ? document.getElementById('telepon').value.trim() : '-';
  var workshopEl = document.getElementById('pilihan-workshop');
  var workshopText = workshopEl.options[workshopEl.selectedIndex].text;
  var kategoriEl = document.getElementById('kategori-peserta');
  var kategoriText = kategoriEl.options[kategoriEl.selectedIndex].text;

  var totalBiaya = hitungBiaya();

  var fasilitasList = [];
  document.querySelectorAll('input[name="fasilitas"]:checked').forEach(function(cb) {
    fasilitasList.push(cb.parentElement.textContent.trim());
  });

  var ringkasanEl = document.getElementById('ringkasan-pendaftaran');
  if (ringkasanEl) {
    ringkasanEl.innerHTML =
      '<h5>✅ Pendaftaran Berhasil Diproses!</h5>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">Nama Lengkap</span><span class="ringkasan-value">' + nama + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">NIM</span><span class="ringkasan-value">' + nim + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">Email</span><span class="ringkasan-value">' + email + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">No. Telepon</span><span class="ringkasan-value">' + (telepon || '-') + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">Workshop</span><span class="ringkasan-value">' + workshopText + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">Kategori</span><span class="ringkasan-value">' + kategoriText + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">Fasilitas</span><span class="ringkasan-value">' + (fasilitasList.length ? fasilitasList.join(', ') : 'Tidak ada') + '</span></div>' +
      '<div class="ringkasan-item"><span class="ringkasan-label">Total Biaya</span><span class="ringkasan-value">Rp ' + totalBiaya.toLocaleString('id-ID') + '</span></div>';

    $(ringkasanEl).slideDown(500);
    $('html, body').animate({ scrollTop: $(ringkasanEl).offset().top - 20 }, 600);
  }
}

function resetForm() {
  document.querySelectorAll('#form-pendaftaran input[type="text"], #form-pendaftaran input[type="email"], #form-pendaftaran input[type="tel"], #form-pendaftaran textarea').forEach(function(el) {
    el.value = '';
  });

  document.querySelectorAll('#form-pendaftaran select').forEach(function(el) {
    el.selectedIndex = 0;
  });

  document.querySelectorAll('#form-pendaftaran input[type="checkbox"]').forEach(function(el) {
    el.checked = false;
  });

  var biayaEl = document.getElementById('biaya-total');
  if (biayaEl) biayaEl.textContent = 'Rp 0';

  var noteEl = document.getElementById('biaya-note');
  if (noteEl) noteEl.style.display = 'none';

  var ringkasan = document.getElementById('ringkasan-pendaftaran');
  if (ringkasan) $(ringkasan).slideUp(300);

  hapusSemuaError();
}

function hapusSemuaError() {
  document.querySelectorAll('.field-error').forEach(function(el) {
    el.classList.remove('field-error');
  });
  document.querySelectorAll('.error-msg').forEach(function(el) {
    el.remove();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  tampilkanSalam();
  initFilter();

  var btnProses = document.getElementById('btn-proses');
  if (btnProses) {
    btnProses.addEventListener('click', validasiForm);
  }

  var btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', resetForm);
  }

  var workshopSel = document.getElementById('pilihan-workshop');
  var kategoriSel = document.getElementById('kategori-peserta');
  var fasilitasChecks = document.querySelectorAll('input[name="fasilitas"]');

  if (workshopSel) workshopSel.addEventListener('change', hitungBiaya);
  if (kategoriSel) kategoriSel.addEventListener('change', hitungBiaya);
  fasilitasChecks.forEach(function(cb) {
    cb.addEventListener('change', hitungBiaya);
  });
});