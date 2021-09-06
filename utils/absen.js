const fs = require("fs");

function loadAbsen() {
  let data = fs.readFileSync("./data/absen.json", "utf-8");
  return JSON.parse(data);
}

function saveAbsen(data) {
  fs.writeFileSync("./data/absen.json", JSON.stringify(data));
}

function addAbsen(data) {
  let namas = data.nama;
  let keterangan = namas
    .map((nama) => data[nama])
    .filter((ket) => ket !== undefined);

  let dataAbsen = loadAbsen();
  let harian = {
    tanggal: data.tanggal,
    absen: [],
  };
  namas.map((nama, i) => {
    harian.absen.push({
      nama: nama,
      nim: data.nim[i],
      keterangan: data[nama],
    });
  });
  dataAbsen.push(harian);
  saveAbsen(dataAbsen);
}

function sumKet() {
  let dataAbsen = loadAbsen();

  dataAbsen.map((harian) => {});
}

module.exports = { addAbsen };
