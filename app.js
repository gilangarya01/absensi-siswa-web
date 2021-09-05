const express = require("express");
const { loadSiswa, addData, findNama } = require("./utils/system");
const methodOverride = require("method-override");

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  let datas = loadSiswa();
  res.render("main", { datas });
});

app.get("/admin", (req, res) => {
  let datas = loadSiswa();
  res.render("admin", { datas });
});

app.get("/admin/add", (req, res) => {
  res.render("add");
});

app.post("/admin", (req, res) => {
  addData(req.body);
});

app.delete("/admin", (req, res) => {
  let test = findNama(req.body.nama);
  res.send(test);
});

app.listen(port, (req, res) => {
  console.log(`Server listining in http://localhost:${port}`);
});
