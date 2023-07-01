const express = require('express');
const mongoose = require('mongoose');
const app = express();

const File = require('./File');

// Ruta pentru încărcarea unui fișier PDF
app.post('/upload', (req, res) => {
  // Procesează cererea de încărcare a fișierului aici
  // Salvează informațiile despre fișier în baza de date
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