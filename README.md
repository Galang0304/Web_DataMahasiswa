# Aplikasi Data Mahasiswa

Aplikasi web sederhana untuk mengelola data mahasiswa dengan fitur autentikasi menggunakan JWT.

## Fitur

- Register dan Login dengan JWT
- Dashboard untuk mengelola data mahasiswa
- CRUD operasi untuk data mahasiswa
- Tampilan responsif dengan Bootstrap

## Prasyarat

Sebelum menjalankan aplikasi, pastikan telah menginstall:

1. Node.js (versi 12 atau lebih baru)
2. NPM (Node Package Manager)
3. Web Browser (Chrome, Firefox, atau Edge)

## Cara Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone [URL_REPOSITORY]
cd Web_DataMahasiswa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Backend Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### 4. Jalankan Frontend

Buka terminal baru, lalu jalankan:

```bash
npx serve .
```

Frontend akan berjalan di `http://localhost:3000`

### 5. Akses Aplikasi

1. Buka browser dan akses `http://localhost:3000`
2. Klik "Daftar disini" untuk membuat akun baru
3. Login dengan akun yang sudah dibuat
4. Mulai mengelola data mahasiswa

## Struktur Folder

```
Web_DataMahasiswa/
├── assests/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── style.css
├── index.html
├── register.html
├── dashboard.html
├── server.js
├── package.json
└── README.md
```

## Troubleshooting

### Port sudah digunakan

Jika muncul error "EADDRINUSE":

1. Matikan semua proses Node.js yang berjalan:
   - Windows: `taskkill /F /IM node.exe`
   - Linux/Mac: `killall node`

2. Jalankan ulang server:
   ```bash
   npm run dev
   ```

### Akses dari Device Lain

Untuk mengakses dari device lain dalam jaringan yang sama:

1. Cek IP address komputer server:
   - Windows: `ipconfig`
   - Linux/Mac: `ifconfig`

2. Ganti `localhost` dengan IP address server di file:
   - `index.html`
   - `register.html`
   - `dashboard.html`

3. Pastikan firewall mengizinkan port 3000 dan 5000

## Teknologi yang Digunakan

- Frontend:
  - HTML5
  - CSS3
  - Bootstrap 5
  - JavaScript (Vanilla)
- Backend:
  - Node.js
  - Express.js
  - JWT (JSON Web Tokens)
  - CORS
  - bcryptjs

## Lisensi

ISC

