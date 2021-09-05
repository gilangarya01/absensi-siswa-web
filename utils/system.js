const fs = require("fs");

function loadSiswa() {
  let data = fs.readFileSync("./data/siswa.json", "utf-8");
  return JSON.parse(data);
}

function writeSiswa(data) {
  fs.writeFileSync("./data/siswa.json", JSON.stringify(data));
}

function findNama(nama) {
  let datas = loadSiswa();
  return datas.find((data) => data.nama === nama);
}

function addData(req) {
  let datas = loadSiswa();
  datas.push(req);
  writeSiswa(datas);
}

module.exports = { loadSiswa, addData, findNama };
