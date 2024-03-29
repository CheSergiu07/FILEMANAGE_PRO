const express = require('express');
const mongoose = require('mongoose');
const app = express();
const File = require('./File');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createDirectories = () => {
  const baseDirectory = 'uploads';
  const classDirectories = ['CL5', 'CL6', 'CL7', 'CL8', 'CL9', 'CL10', 'CL11', 'CL12'];

  for (const classDirectory of classDirectories) {
    for (let i = 1; i <= 100; i++) {
      const dirPath = path.join(__dirname, baseDirectory, classDirectory, i.toString());
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
};

createDirectories();
const cors = require('cors');

// Permitere CORS pentru toate cererile
app.use(cors());

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
}).array('file', 10);

app.get('/upload', (req, res) => {
  const filePath = path.join(__dirname, 'upload.html');
  res.sendFile(filePath);
});

app.post('/upload', upload, (req, res) => {
  if (req.files) {
    req.files.forEach(file => {
      const { originalname, filename, path: filePath } = file;

      const classDirectory = req.body.classDirectory;
      const subDirectory = req.body.subDirectory;

      // Muta fisierul in directorul corespunzator
      if (isNaN(subDirectory) || subDirectory < 1 || subDirectory > 100) {
        return res.status(400).json({ error: 'Invalid subdirectory.' });
      }
      
      const newPath = path.join(__dirname, 'uploads', classDirectory, subDirectory, filename);
      fs.renameSync(filePath, newPath);

      const newFile = new File({
        filename: originalname,
        url: `/uploads/${classDirectory}/${subDirectory}/${filename}`
      });

      newFile.save()
        .then(() => {
          res.status(200).json({ message: 'File uploaded successfully!' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'An error occurred while saving the file.' });
        });
    });
  } else {
    res.status(400).json({ error: 'No files uploaded.' });
  }
});

app.get('/files', (req, res) => {
  File.find()
    .then(files => {
      res.status(200).json(files);
    })
    .catch(error => {
      res.status(500).json({ error: 'A apărut o eroare la obținerea fișierelor.' });
    });
});

app.get('/files/:id', (req, res) => {
  const id = req.params.id;

  File.findById(id)
    .then(file => {
      if (!file) {
        return res.status(404).json({ error: 'File not found.' });
      }

      const filePath = path.join(__dirname, 'uploads', file.filename);
      res.download(filePath, file.filename, (err) => {
        if (err) {
          res.status(500).json({ error: 'An error occurred while downloading the file.' });
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while getting the file.' });
    });
});

app.delete('/files/:id', (req, res) => {
  const id = req.params.id;

  File.findByIdAndRemove(id)
    .then(file => {
      if (!file) {
        return res.status(404).json({ error: 'File not found.' });
      }

      const filePath = path.join(__dirname, 'uploads', file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ error: 'An error occurred while deleting the file.' });
        } else {
          res.status(200).json({ message: 'File deleted successfully!' });
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while deleting the file.' });
    });
});

app.get('/files.html', (req, res) => {
  const filePath = path.join(__dirname, 'files.html');
  res.sendFile(filePath);
});

const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/filemanage_pdf', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
