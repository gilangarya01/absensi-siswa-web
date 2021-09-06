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
} = require("./utils/system");
const methodOverride = require("method-override");
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
  res.render("main", { datas, date });
});

// Add Data Absen
app.post("/", (req, res) => {
  addAbsen(req.body);
  res.redirect("/");
});

// Admin
app.get("/admin", (req, res) => {
  let datas = loadSiswa();
  let msg = req.flash("msg");
  res.render("admin", { datas, msg });
});

// Add Form Siswa
app.get("/admin/add", (req, res) => {
  let error = req.flash("error");
  res.render("add", { error });
});

// Edit Form Siswa
app.get("/admin/edit/:nim", (req, res) => {
  let data = findNIM(req.params.nim);
  let error = req.flash("error");
  res.render("edit", { data, error });
});

// Update Data Siswa
app.put("/admin", (req, res) => {
  if (checkDuplicate(req.body)) {
    req.flash("error", "NIM sudah digunakan");
    res.redirect(`/admin/edit/${req.body.tempNIM}`);
  } else {
    editSiswa(req.body);
    req.flash("msg", "Data berhasil diubah");
    res.redirect("/admin");
  }
});

// Add Data Siswa
app.post("/admin", (req, res) => {
  if (checkDuplicate(req.body)) {
    req.flash("error", "NIM sudah digunakan");
    res.redirect(`/admin/add`);
  } else {
    addData(req.body);
    req.flash("msg", "Data berhasil ditambahkan");
    res.redirect("/admin");
  }
});

// Delete Data Siswa
app.delete("/admin", (req, res) => {
  deleteSiswa(req.body.nim);
  req.flash("msg", "Data berhasil dihapus");
  res.redirect("/admin");
});

app.listen(port, (req, res) => {
  console.log(`Server listining in http://localhost:${port}`);
});
