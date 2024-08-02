const express = require("express");

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

const methodOverride = require("method-override");

// Flash Message
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// Flash Config
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 6000 } }));
app.use(flash());

// Home
app.get("/", (req, res) => {
  let datas = loadSiswa();
  let date = dateNow();
  let msg = req.flash("msg");
  let error = req.flash("error");
  res.render("index", { datas, date, msg, error });
});

// Add Data Absen
app.post("/", (req, res) => {
  addAbsen(req.body);
  req.flash("msg", "Absen berhasil ditambahkan");
  res.redirect("/");
});

// Data Siswa
app.get("/datasiswa", (req, res) => {
  let datas = loadSiswa();
  let msg = req.flash("msg");
  res.render("datasiswa", { datas, msg });
});

// Add Form Siswa
app.get("/datasiswa/add", (req, res) => {
  let error = req.flash("error");
  res.render("add", { error });
});

// Edit Form Siswa
app.get("/datasiswa/edit/:nim", (req, res) => {
  let data = findNIM(req.params.nim);
  let error = req.flash("error");
  res.render("edit", { data, error });
});

// Update Data Siswa
app.put("/datasiswa", (req, res) => {
  if (checkDuplicate(req.body)) {
    req.flash("error", "NIM sudah digunakan");
    res.redirect(`/datasiswa/edit/${req.body.tempNIM}`);
  } else {
    editSiswa(req.body);
    req.flash("msg", "Data berhasil diubah");
    res.redirect("/datasiswa");
  }
});

// Add Data Siswa
app.post("/datasiswa", (req, res) => {
  if (checkDuplicate(req.body)) {
    req.flash("error", "NIM sudah digunakan");
    res.redirect(`/datasiswa/add`);
  } else {
    addData(req.body);
    req.flash("msg", "Data berhasil ditambahkan");
    res.redirect("/datasiswa");
  }
});

// Delete Data Siswa
app.delete("/datasiswa", (req, res) => {
  deleteSiswa(req.body.nim);
  deleteAbsen(req.body.nim);
  req.flash("msg", "Data berhasil dihapus");
  res.redirect("/datasiswa");
});

// Laporan
app.get("/laporan", (req, res) => {
  let datas = loadSiswa();
  let dataKet = sumKet();
  res.render("laporan", { datas, dataKet });
});

app.listen(port, (req, res) => {
  console.log(`Server listining in http://localhost:${port}`);
});
