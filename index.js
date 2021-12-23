const bodyparser = require('body-parser');
var fs = require('fs') // this engine requires the fs module

const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyparser.json());

app.options('/case/overzicht-bgk', (req, res) => {
  console.log('receiving OPTIONS req');
  console.log(' OPTIONS headers', req.headers)
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})


app.post('/case/overzicht-bgk', (req, res) => {
  console.log('body', req.body);

  console.log('headers', req.headers)


  const bgkData = getJson('bgk.json');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(bgkData)

})

app.get('/get_stuff', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const tableData = getJson('tableData.json');
  res.status(200).send(tableData)


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const getJson = (file) => {

  let rawdata = fs.readFileSync(file);
  return JSON.parse(rawdata);
}