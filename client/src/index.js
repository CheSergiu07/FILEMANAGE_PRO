const express = require('express');
const cors = require('cors');

const app = express();

// Permită cereri din originea http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Restul configurației serverului Node...
// ...

// Ascultă pe portul 3001
app.listen(3001, () => {
  console.log('Serverul Node rulează pe portul 3001');
});
