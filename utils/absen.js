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
  data = [];
  // [masuk, izin, alpa]
  ket = [0, 0, 0];

  for (let i = 0; i < dataAbsen[0]["absen"].length; i++) {
    data.push([...ket]);
  }

  dataAbsen.forEach((harian) => {
    for (let i = 0; i < harian["absen"].length; i++) {
      switch (harian["absen"][i]["keterangan"]) {
        case "masuk":
          data[i][0]++;
          break;
        case "izin":
          data[i][1]++;
          break;
        case "alpa":
          data[i][2]++;
          break;
      }
    }
  });
  return data;
}

module.exports = { addAbsen, sumKet };
