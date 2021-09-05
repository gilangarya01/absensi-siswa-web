const fs = require("fs");

function loadSiswa() {
  let data = fs.readFileSync("./data/siswa.json", "utf-8");
  return JSON.parse(data);
}

function saveSiswa(data) {
  fs.writeFileSync("./data/siswa.json", JSON.stringify(data));
}

function findNama(nama) {
  return loadSiswa().find((data) => data.nama === nama);
}

function findNIM(nim) {
  return loadSiswa().find((data) => data.nim === nim);
}

function addData(req) {
  let datas = loadSiswa();
  datas.push(req);
  saveSiswa(datas);
}

function deleteSiswa(nama) {
  let newData = loadSiswa().filter((data) => data.nama !== nama);
  saveSiswa(newData);
}

module.exports = { loadSiswa, addData, deleteSiswa, findNIM };
