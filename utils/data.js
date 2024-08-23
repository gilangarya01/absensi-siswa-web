// Memuat modul file system (fs) untuk melakukan operasi baca/tulis file
const fs = require("fs");

// Fungsi untuk memuat (membaca) data siswa dari file siswa.json
// Data siswa disimpan dalam format JSON dan dikembalikan sebagai objek JavaScript
function loadSiswa() {
  let data = fs.readFileSync("./data/siswa.json", "utf-8"); // Membaca isi file siswa.json
  return JSON.parse(data); // Mengubah data dari format JSON menjadi objek JavaScript
}

// Fungsi untuk menyimpan data siswa ke dalam file siswa.json
// Data siswa diubah menjadi format JSON sebelum disimpan
function saveSiswa(data) {
  fs.writeFileSync("./data/siswa.json", JSON.stringify(data)); // Menyimpan data sebagai JSON string ke file siswa.json
}

// Fungsi untuk mencari data siswa berdasarkan NIM (Nomor Induk Mahasiswa)
// Mengembalikan objek siswa yang sesuai dengan NIM yang dicari, atau undefined jika tidak ditemukan
function findNIM(nim) {
  return loadSiswa().find((data) => data.nim === nim); // Mencari siswa dengan NIM yang sesuai di dalam data siswa
}

// Fungsi untuk menambahkan data siswa baru ke dalam file siswa.json
// Data siswa baru akan ditambahkan ke akhir daftar siswa yang ada
function addData(req) {
  let datas = loadSiswa(); // Memuat data siswa yang sudah ada
  datas.push(req); // Menambahkan data siswa baru ke dalam daftar
  saveSiswa(datas); // Menyimpan kembali seluruh daftar siswa ke dalam file
}

// Fungsi untuk menghapus data siswa berdasarkan NIM
// Siswa dengan NIM yang sesuai akan dihapus dari file siswa.json
function deleteSiswa(nim) {
  let datas = loadSiswa(); // Memuat data siswa yang ada
  let newData = datas.filter((data) => data.nim !== nim); // Membuat daftar siswa baru tanpa siswa yang memiliki NIM tersebut
  saveSiswa(newData); // Menyimpan daftar siswa yang sudah diperbarui ke file
}

// Fungsi untuk mengedit data siswa
// Mencari siswa berdasarkan NIM sementara (tempNIM) dan memperbarui data siswa tersebut
function editSiswa(siswa) {
  let datas = loadSiswa(); // Memuat data siswa yang ada
  let dataSiswa = datas.find((data) => data.nim === siswa.tempNIM); // Mencari siswa berdasarkan NIM sementara
  let index = datas.indexOf(dataSiswa); // Mendapatkan indeks siswa dalam daftar

  delete siswa.tempNIM; // Menghapus properti tempNIM dari objek siswa yang diperbarui
  datas[index] = siswa; // Menggantikan data siswa lama dengan data siswa yang baru
  saveSiswa(datas); // Menyimpan kembali seluruh daftar siswa yang sudah diperbarui ke file
}

// Fungsi untuk memeriksa apakah NIM siswa yang baru ditambahkan atau diubah sudah ada dalam daftar
// Menghindari duplikasi NIM pada siswa baru atau saat pengeditan
function checkDuplicate(siswa) {
  let check = findNIM(siswa.nim); // Mencari siswa dengan NIM yang sama

  // Jika NIM sementara ada (saat mengedit data), periksa apakah NIM baru berbeda dari NIM lama dan sudah ada di daftar
  if (siswa.tempNIM) {
    if (siswa.tempNIM !== siswa.nim && check) {
      return true; // NIM baru sudah ada di daftar, duplikasi ditemukan
    }
  } else {
    // Jika menambahkan siswa baru, periksa apakah NIM sudah ada di daftar
    if (check) {
      return true; // NIM sudah ada di daftar, duplikasi ditemukan
    }
  }
  return false; // Tidak ditemukan duplikasi, aman untuk ditambahkan atau diedit
}

// Fungsi untuk mendapatkan tanggal hari ini dalam format dd/mm/yyyy
// Digunakan untuk mencatat tanggal absensi atau kegiatan lainnya
function dateNow() {
  const today = new Date(); // Mendapatkan tanggal hari ini
  const dd = String(today.getDate()).padStart(2, "0"); // Mendapatkan hari dengan dua digit (01-31)
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan dengan dua digit (01-12)
  const yyyy = today.getFullYear(); // Mendapatkan tahun

  return dd + "/" + mm + "/" + yyyy; // Menggabungkan hari, bulan, dan tahun menjadi satu string dengan format dd/mm/yyyy
}

// Fungsi untuk memuat (membaca) data absensi dari file absen.json
// Data absensi disimpan dalam format JSON dan dikembalikan sebagai objek JavaScript
function loadAbsen() {
  let data = fs.readFileSync("./data/absen.json", "utf-8"); // Membaca isi file absen.json
  return JSON.parse(data); // Mengubah data dari format JSON menjadi objek JavaScript
}

// Fungsi untuk menyimpan data absensi ke dalam file absen.json
// Data absensi diubah menjadi format JSON sebelum disimpan
function saveAbsen(data) {
  fs.writeFileSync("./data/absen.json", JSON.stringify(data)); // Menyimpan data sebagai JSON string ke file absen.json
}

// Fungsi untuk menambahkan data absensi harian
// Setiap siswa akan dicatat kehadirannya dengan status masuk, izin, atau alpa
function addAbsen(data) {
  let namas = data.nama; // Daftar nama siswa yang diabsen

  let dataAbsen = loadAbsen(); // Memuat data absensi yang sudah ada
  let harian = {
    tanggal: data.tanggal, // Mencatat tanggal absensi
    absen: [], // Menyimpan data absensi untuk setiap siswa
  };
  // Menambahkan data absensi untuk setiap siswa berdasarkan nama dan NIM
  namas.map((nama, i) => {
    harian.absen.push({
      nama: nama, // Nama siswa
      nim: data.nim[i], // NIM siswa
      keterangan: data[nama], // Status kehadiran (masuk, izin, alpa)
    });
  });
  dataAbsen.push(harian); // Menambahkan data absensi harian ke dalam daftar
  saveAbsen(dataAbsen); // Menyimpan kembali seluruh daftar absensi yang sudah diperbarui ke file
}

// Fungsi untuk menghitung total kehadiran, izin, dan alpa untuk setiap siswa
// Menghasilkan data dalam bentuk array dengan jumlah masuk, izin, dan alpa
function sumKet() {
  let dataAbsen = loadAbsen(); // Memuat data absensi
  let dataSiswa = loadSiswa(); // Memuat data siswa
  data = []; // Menyimpan hasil perhitungan kehadiran untuk setiap siswa
  // Array untuk menghitung jumlah status masuk, izin, dan alpa
  ket = [0, 0, 0];

  // Inisialisasi array data dengan nilai awal untuk setiap siswa
  for (let i = 0; i < dataSiswa.length; i++) {
    data.push([...ket]); // Setiap siswa memiliki array [masuk, izin, alpa]
  }

  // Jika ada data absensi, lakukan perhitungan
  if (dataAbsen.length > 0) {
    dataAbsen.forEach((harian) => {
      // Untuk setiap hari absensi, periksa setiap siswa
      for (let i = 0; i < harian["absen"].length; i++) {
        // Tambahkan jumlah kehadiran, izin, atau alpa sesuai keterangan
        switch (harian["absen"][i]["keterangan"]) {
          case "masuk":
            data[i][0]++; // Tambah jumlah masuk
            break;
          case "izin":
            data[i][1]++; // Tambah jumlah izin
            break;
          case "alpa":
            data[i][2]++; // Tambah jumlah alpa
            break;
        }
      }
    });
  }

  return data; // Mengembalikan hasil perhitungan dalam bentuk array
}

// Fungsi untuk menghapus data absensi siswa berdasarkan NIM
// Siswa dengan NIM yang sesuai akan dihapus dari setiap catatan absensi harian
function deleteAbsen(nim) {
  let datas = loadAbsen(); // Memuat data absensi yang ada
  // Iterasi setiap hari absensi dan hapus siswa dengan NIM yang sesuai
  datas.map((data, i) => {
    let newData = data["absen"].filter((siswa) => siswa.nim !== nim); // Filter siswa yang bukan target
    datas[i]["absen"] = newData; // Perbarui data absensi harian dengan daftar siswa baru
  });
  saveAbsen(datas); // Simpan kembali daftar absensi yang sudah diperbarui
}

// Fungsi placeholder yang tidak digunakan dalam implementasi ini
function newData() {
  let data = 0; // Fungsi tidak melakukan apapun
}

// Mengekspor fungsi-fungsi agar dapat digunakan di file lain dalam aplikasi ini
module.exports = {
  loadSiswa,
  addData,
  deleteSiswa,
  findNIM,
  editSiswa,
  dateNow,
  checkDuplicate,
  addAbsen,
  sumKet,
  deleteAbsen,
};
