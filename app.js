const express = require('express');
const mongoose = require('mongoose');
const app = express();
const File = require('./File');
const multer = require('multer');
const path = require('path');

// Configurarea multer pentru a salva fișierele încărcate în directorul 'uploads'
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    callback(null, originalName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.dwg'];
    const ext = path.extname(file.originalname);
    if (!allowedExtensions.includes(ext)) {
      return callback(new Error('Only PDF, DOC, DOCX, XLS, XLSX, and DWG files are allowed.'));
    }
    callback(null, true);
  },
});


// Ruta pentru servirea fișierului upload.html
app.get('/upload.html', (req, res) => {
  const filePath = path.join(__dirname, 'upload.html');
  res.sendFile(filePath);
});

// Ruta pentru încărcarea unui fișier PDF
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    // Obține informațiile despre fișier din obiectul 'req.file'
    const { originalname, filename, path } = req.file;

    // Construiește un nou obiect 'file' pe baza modelului 'File'
    const newFile = new File({
      filename: originalname,
      url: `/uploads/${filename}`
    });

    // Salvează noul obiect 'file' în baza de date
    newFile.save()
      .then(() => {
        res.status(200).json({ message: 'File uploaded successfully!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while saving the file.' });
      });
  } else {
    res.status(400).json({ error: 'No file uploaded.' });
  }
});

// Ruta pentru obținerea tuturor fișierelor PDF
app.get('/files', (req, res) => {
  // Obține toate fișierele din baza de date și le trimite ca răspuns
});

// Ruta pentru descărcarea unui fișier PDF specific
app.get('/files/:id', (req, res) => {
  // Obține fișierul specificat din baza de date și trimite-l ca răspuns
});

// Ruta pentru ștergerea unui fișier PDF specific
app.delete('/files/:id', (req, res) => {
  // Șterge fișierul specificat din baza de date
});



const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/filemanage_pdf', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});