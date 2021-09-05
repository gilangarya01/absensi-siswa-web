const fs = require("fs");

function loadSiswa() {
  let data = fs.readFileSync("./data/siswa.json", "utf-8");
  return JSON.parse(data);
}

function saveSiswa(data) {
  fs.writeFileSync("./data/siswa.json", JSON.stringify(data));
}

function findNIM(nim) {
  return loadSiswa().find((data) => data.nim === nim);
}

function addData(req) {
  let datas = loadSiswa();
  datas.push(req);
  saveSiswa(datas);
}

function deleteSiswa(nim) {
  let newData = loadSiswa().filter((data) => data.nim !== nim);
  saveSiswa(newData);
}

function editSiswa(data) {
  let datas = loadSiswa();
  let dataSiswa = datas.find((data) => data.nim === data.nim);
  let index = datas.indexOf(dataSiswa);

  datas[index] = data;
  saveSiswa(datas);
}

module.exports = { loadSiswa, addData, deleteSiswa, findNIM, editSiswa };
