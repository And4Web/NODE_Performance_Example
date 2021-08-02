const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Performance Example.')
});

app.get('/timer', (req, res) => {
  //delay the response:
  res.send('DING DING...');
});