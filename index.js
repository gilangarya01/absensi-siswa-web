// Import modul express dan method-override
const express = require("express");
const methodOverride = require("method-override");

// Import fungsi dari utils/data.js
const {
  loadSiswa,
  addData,
  findNIM,
  deleteSiswa,
  editSiswa,
  dateNow,
  checkDuplicate,
  addAbsen,
  sumKet,
  deleteAbsen,
} = require("./utils/data");

// Import modul untuk membuat sesi dan flash messages
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// Inisialisasi aplikasi Express dan setel port
const app = express();
const port = 3000;

// Middleware untuk mem-parsing data dari body pada request POST
app.use(express.urlencoded({ extended: true }));

// Mengatur view engine aplikasi ke EJS (Embedded JavaScript)
// untuk merender halaman HTML
app.set("view engine", "ejs");

// Menggunakan methodOverride untuk mendukung metode HTTP seperti PUT dan DELETE
app.use(methodOverride("_method"));

// Middleware untuk sesi dan flash messages
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 6000 } }));
app.use(flash());

// Rute GET untuk path root "/"
// Menampilkan data siswa dan absensi siswa
app.get("/", (req, res) => {
  // Mengambil data siswa dan tanggal hari ini
  let datas = loadSiswa();
  let date = dateNow();
  // Mengambil pesan flash untuk pesan dan error
  let msg = req.flash("msg");
  let error = req.flash("error");
  // Merender file index.ejs dengan data siswa, tanggal, dan pesan/error
  res.render("index", { datas, date, msg, error });
});

// Rute POST untuk menambahkan data absen siswa
app.post("/", (req, res) => {
  // Menambahkan data absen siswa
  addAbsen(req.body);
  // Mengatur pesan flash bahwa absen berhasil ditambahkan
  req.flash("msg", "Absen berhasil ditambahkan");
  // Mengarahkan kembali ke halaman utama
  res.redirect("/");
});

// Rute GET untuk path "/datasiswa"
// Menampilkan halaman manajemen data siswa
app.get("/datasiswa", (req, res) => {
  // Mengambil data siswa dan pesan flash
  let datas = loadSiswa();
  let msg = req.flash("msg");
  // Merender file datasiswa.ejs dengan data siswa dan pesan
  res.render("datasiswa", { datas, msg });
});

// Rute GET untuk menampilkan form penambahan data siswa
app.get("/datasiswa/add", (req, res) => {
  // Mengambil pesan flash untuk error
  let error = req.flash("error");
  // Merender file add.ejs dengan pesan error
  res.render("add", { error });
});

// Rute GET untuk menampilkan form pengeditan data siswa
app.get("/datasiswa/edit/:nim", (req, res) => {
  // Mengambil data siswa berdasarkan NIM dari parameter
  let data = findNIM(req.params.nim);
  let error = req.flash("error");
  // Merender file edit.ejs dengan data siswa dan pesan error
  res.render("edit", { data, error });
});

// Rute PUT untuk mengupdate data siswa
app.put("/datasiswa", (req, res) => {
  // Memeriksa apakah NIM sudah digunakan
  if (checkDuplicate(req.body)) {
    // Mengatur pesan flash bahwa NIM sudah digunakan
    req.flash("error", "NIM sudah digunakan");
    // Mengarahkan kembali ke halaman edit data siswa
    res.redirect(`/datasiswa/edit/${req.body.tempNIM}`);
  } else {
    // Mengupdate data siswa
    editSiswa(req.body);
    // Mengatur pesan flash bahwa data berhasil diubah
    req.flash("msg", "Data berhasil diubah");
    // Mengarahkan kembali ke halaman datasiswa
    res.redirect("/datasiswa");
  }
});

// Rute POST untuk menambahkan data siswa baru
app.post("/datasiswa", (req, res) => {
  // Memeriksa apakah NIM sudah digunakan
  if (checkDuplicate(req.body)) {
    // Mengatur pesan flash bahwa NIM sudah digunakan
    req.flash("error", "NIM sudah digunakan");
    // Mengarahkan kembali ke halaman penambahan data siswa
    res.redirect(`/datasiswa/add`);
  } else {
    // Menambahkan data siswa baru
    addData(req.body);
    // Mengatur pesan flash bahwa data berhasil ditambahkan
    req.flash("msg", "Data berhasil ditambahkan");
    // Mengarahkan kembali ke halaman datasiswa
    res.redirect("/datasiswa");
  }
});

// Rute DELETE untuk menghapus data siswa
app.delete("/datasiswa", (req, res) => {
  // Menghapus data siswa beserta absensinya
  deleteSiswa(req.body.nim);
  deleteAbsen(req.body.nim);
  // Mengatur pesan flash bahwa data berhasil dihapus
  req.flash("msg", "Data berhasil dihapus");
  // Mengarahkan kembali ke halaman datasiswa
  res.redirect("/datasiswa");
});

// Rute GET untuk menampilkan laporan absensi
app.get("/laporan", (req, res) => {
  // Mengambil data siswa dan total kehadiran serta ketidakhadiran
  let datas = loadSiswa();
  let dataKet = sumKet();
  // Merender file laporan.ejs dengan data siswa dan kehadiran
  res.render("laporan", { datas, dataKet });
});

// Menjalankan server dan mendengarkan pada port yang ditentukan
app.listen(port, () => {
  // Menampilkan pesan di console ketika server berhasil dijalankan
  console.log(`Server listening on http://localhost:${port}`);
});
