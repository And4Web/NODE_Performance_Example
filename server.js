const express = require('express');
const cluster = require('cluster');
const os = require('os');

//const { fork } = require('child_process');

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
  res.send(`Performance Example: ${process.pid}`)
});

app.get('/timer', (req, res) => {
  //delay the response:
  delay(7000);

  res.send(`DING DING... ${process.pid}`);
});

console.log('Running server.js...')

if(cluster.isMaster){
  const NUM_WORKERS = os.cpus().length; //it gives the amount of logocal cores.
  console.log(`Number of Logical Cores in my Machine: ${NUM_WORKERS}`)
  
  console.log('Master has been started...');
     
  for(i=0; i<NUM_WORKERS; i++){
    cluster.fork();
  }

} else{
  console.log('Worker Process started...');
  app.listen(3000);
}
