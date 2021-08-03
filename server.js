const express = require('express');
const cluster = require('cluster');
const app = express();

function delay(duration){
  const start = Date.now();
  while(Date.now() - start < duration){
    //event loop is blocked...
  }
};

app.get('/', (req, res) => {
  //examples of some real life functions that block the event loop:
  //JSON.stringify({}) => "{}"
  //JSON.parse("{}") => {}
  //array.sort()
  res.send('Performance Example.')
});

app.get('/timer', (req, res) => {
  //delay the response:
  delay(5000);

  res.send('DING DING...');
});

app.listen(3000);