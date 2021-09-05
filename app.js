const express = require("express");
const {
  loadSiswa,
  addData,
  findNIM,
  deleteSiswa,
  editSiswa,
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

app.get("/", (req, res) => {
  let datas = loadSiswa();
  res.render("main", { datas });
});

app.get("/admin", (req, res) => {
  let datas = loadSiswa();
  let msg = req.flash("msg");
  res.render("admin", { datas, msg });
});

app.get("/admin/add", (req, res) => {
  res.render("add");
});

app.get("/admin/edit/:nim", (req, res) => {
  let data = findNIM(req.params.nim);
  res.render("edit", { data });
});

app.put("/admin", (req, res) => {
  editSiswa(req.body);
  res.redirect("/admin");
});

app.post("/admin", (req, res) => {
  addData(req.body);
  req.flash("msg", "Data berhasil ditambahkan");
  res.redirect("/admin");
});

app.delete("/admin", (req, res) => {
  deleteSiswa(req.body.nim);
  req.flash("msg", "Data berhasil dihapus");
  res.redirect("/admin");
});

app.listen(port, (req, res) => {
  console.log(`Server listining in http://localhost:${port}`);
});
