const bodyparser = require('body-parser');

const tableData = require('./bgk2.json');
const latestBookingsData = require('./latestBookings.json');

const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyparser.json());

app.options('/case/overzicht-bgk', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})

app.options('/case/overzicht-bgk/count', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})

app.options('/case/overzicht-bgk/latestBookings', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})



app.post('/case/overzicht-bgk/count', (req, res) => {

  console.log('count called: ' + tableData.content.length);
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send({ "folders": [1313], "totalSize": tableData.content.length })

})

app.post('/case/overzicht-bgk', (req, res) => {
  const i = req.body.chunkIndex;
  console.log(`index is ${i}`)
  const n = 100;

  res.setHeader('Access-Control-Allow-Origin', '*')

  setTimeout((() => {
    res.status(200).send({ "total_size": tableData.content.length, "chunkIndex": i, "chunkSize": n, "content": tableData.content.slice(n * i, n * (i + 1)) })
  }), 100)

})


app.post('/case/overzicht-bgk/latestBookings', (req, res) => {
  const type = req.body.type;
  console.log(`latestBooling called for type "${type}"`);
  res.setHeader('Access-Control-Allow-Origin', '*')

  const i = 0;
  const n = 100;
  res.status(200).send({ "total_size": latestBookingsData.content.length, "chunkIndex": i, "chunkSize": n, "content": latestBookingsData.content.slice(n * i, n * (i + 1)) })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
