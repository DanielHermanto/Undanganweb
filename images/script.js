// Konfigurasi dasar
const musik = document.getElementById('backgroundMusic');
const sections = document.querySelectorAll('section');

// Efek buka undangan
document.getElementById('openButton').addEventListener('click', () => {
    const pembuka = document.getElementById('pembuka');
    pembuka.style.opacity = 0;
    setTimeout(() => {
        window.scrollTo({ top: document.getElementById('profil').offsetTop, behavior: 'smooth' });
        musik.play();
    }, 500);
});

// Animasi muncul tiap section
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Form ucapan dengan localStorage
document.getElementById('ucapanForm').addEventListener('submit', e => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    if (nama && pesan) {
        let ucapanList = JSON.parse(localStorage.getItem('ucapanList')) || [];
        ucapanList.push({ nama, pesan });
        localStorage.setItem('ucapanList', JSON.stringify(ucapanList));
        tampilkanUcapan();
        e.target.reset();
    }
});

// Tampilkan ucapan yang tersimpan
function tampilkanUcapan() {
    const ucapanList = JSON.parse(localStorage.getItem('ucapanList')) || [];
    const daftarUcapan = document.getElementById('daftarUcapan');
    daftarUcapan.innerHTML = '';
    ucapanList.forEach(ucapan => {
        daftarUcapan.innerHTML += `<p><strong>${ucapan.nama}:</strong> ${ucapan.pesan}</p>`;
    });
}

// Muat ulang daftar ucapan saat halaman dibuka
tampilkanUcapan();
