const express = require('express');
const app = express();

function delay(duration){
  const start = Date.now();
  while(Date.now() - start < duration){
    //event loop is blocked...
  }
};

app.get('/', (req, res) => {
  res.send('Performance Example.')
});

app.get('/timer', (req, res) => {
  //delay the response:
  delay(5000);

  res.send('DING DING...');
});

app.listen(3000);