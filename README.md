## Absensi Siswa Web

### Decription

Website untuk absensi siswa dengan menggunakan ExpressJS, untuk data akan tersimpan kedalam file JSON yang ada di folder data. Website ini dibuat untuk latihan saya menggunakan NodeJS & ExpressJS, kode masih berantakan dan masih banyak yang harus diperbaiki lagi

### Tech Stack

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### How To Use

#### • Docker

Pastikan memiliki `docker` pada environment

1. Setelah clone, pindah ke folder project

```bash
cd absensi-siswa-web
```

2. Build docker image

```bash
docker build -t absensi-siswa-web
```

3. Run docker image

```bash
docker run -d -p 3000:3000 absensi-siswa-web:latest
```

Untuk mengakses websitenya pergi ke `http://localhost:3000`

4. Stop docker container

```bash
docker ps

docker stop <container-id>
```

#### • Manual

Pastikan anda memiliki `node js` dan `npm` pada environment

1. Setelah clone, pindah ke folder project

```bash
cd absensi-siswa-web
```

3. Install package npm yang diperlukan

```bash
npm install
```

4. Jalankan website dengan `node`

```bash
node index.js
```
