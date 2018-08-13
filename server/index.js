// const grcp = require('./client');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// const client = new grcp(PORT);

// app.get('/images', (req, res) => {
//   if (err) {
//     console.log(err);
//     res.status(404).send('request error');
//   }
//   res.status(200).send('request ok');
// });

app.use(express.static(path.join(__dirname, '../static')));

app.listen(PORT, err => {
  if (err) {
    console.log('error listening to server ', err);
  }
  console.log(`connected to server on PORT ${PORT}`);
});
