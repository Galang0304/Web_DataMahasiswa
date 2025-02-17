const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

// Konfigurasi CORS yang lebih spesifik
app.use(cors({
    origin: '*', // Mengizinkan semua origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const SECRET_KEY = 'kunci_rahasia_jwt_data_mahasiswa';

// Database simulasi
let users = [];
let mahasiswa = [];

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: 'Token diperlukan untuk autentikasi' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
};

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { nama, email, password } = req.body;

    // Validasi input
    if (!nama || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    // Cek email sudah terdaftar
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = {
        id: users.length + 1,
        nama,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.status(201).json({
        message: 'Registrasi berhasil',
        token
    });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Cari user
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Generate token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.json({
        message: 'Login berhasil',
        token
    });
});

// Protected route - Data Mahasiswa
app.get('/api/mahasiswa', verifyToken, (req, res) => {
    res.json(mahasiswa);
});

app.post('/api/mahasiswa', verifyToken, (req, res) => {
    const { nim, nama, jurusan, angkatan } = req.body;
    
    const newMahasiswa = {
        id: mahasiswa.length + 1,
        nim,
        nama,
        jurusan,
        angkatan,
        created_by: req.user.id
    };

    mahasiswa.push(newMahasiswa);
    res.status(201).json(newMahasiswa);
});

const PORT = 5000;
const HOST = '0.0.0.0'; // Mengizinkan akses dari semua IP

app.listen(PORT, HOST, () => {
    console.log(`Server berjalan di http://${HOST}:${PORT}`);
}); 