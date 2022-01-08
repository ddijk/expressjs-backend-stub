const bodyparser = require('body-parser');

const tableData = require('./bgk2.json');

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


app.post('/case/overzicht-bgk', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(tableData)

})

app.get('/get_stuff', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.status(200).send(tableData)

})

app.get('/get_total_size', (req, res) => {


  const total = { "total": tableData.length }
  res.status(200).send(total)
})

app.get('/get_chunk', (req, res) => {
  const n = Number(req.query['n'])
  const i = Number(req.query['i'])
  console.log('chunk size', n)
  console.log('chunk index', i)
  res.setHeader('Access-Control-Allow-Origin', '*')

  setTimeout((() => {
    res.status(200).send({ "total_size": tableData.length, "chunk_index": i, "chunk_size": n, "content": tableData.slice(n * i, n * (i + 1)) })
  }), 2000)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
