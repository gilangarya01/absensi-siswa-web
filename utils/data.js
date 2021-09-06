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
  let datas = loadSiswa();
  let newData = datas.filter((data) => data.nim !== nim);

  saveSiswa(newData);
}

function editSiswa(siswa) {
  let datas = loadSiswa();
  let dataSiswa = datas.find((data) => data.nim === siswa.tempNIM);
  let index = datas.indexOf(dataSiswa);

  delete siswa.tempNIM;
  datas[index] = siswa;
  saveSiswa(datas);
}

function checkDuplicate(siswa) {
  let check = findNIM(siswa.nim);

  if (siswa.tempNIM) {
    if (siswa.tempNIM !== siswa.nim && check) {
      return true;
    }
  } else {
    if (check) {
      return true;
    }
  }
  return false;
}

function dateNow() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
}

module.exports = {
  loadSiswa,
  addData,
  deleteSiswa,
  findNIM,
  editSiswa,
  dateNow,
  checkDuplicate,
};
