const bodyParser = require('body-parser');

//const tableData = require('./bgk2.json');
const tableData = require('./bgk_generated.json');
const latestBookingsData = require('./latest_dates_generated.json');
const urenData = require('./merge_uren_declarations/uren_getbysheetdate_A.json');
const declarationData = require('./merge_uren_declarations/declarations_A.json');

const express = require('express')
const app = express()
const port = 9000
const n = 100;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use(bodyparser.json());
var jsonParser = bodyParser.json()

app.options('/case/overzicht-bgk', jsonParser, (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})

app.options('/case/overzicht-bgk/count', jsonParser, (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})

app.options('/case/overzicht-bgk/latestBookings', jsonParser, (req, res) => {
  console.log('options latestbookings')
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})
app.options('/api/uren/getbysheetdate', jsonParser,(req, res) => {
  console.log('options getbysheetdate')
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})
app.options('/api/declaration', jsonParser,(req, res) => {
  console.log('options declaration')
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
})


app.post('/case/overzicht-bgk/count', jsonParser, (req, res) => {

  console.log('count called: ' + tableData.content.length);
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send({ "folders": [1313], "totalSize": tableData.content.length, "defaultQueries": { "datumLastContactClient": ["015"], "datumLastContactCustomCodes": [], "datumLastContactMedisch": ["016"], "datumLastContactWederpartij": ["017", "018", "022", "023"] } })

})

app.post('/case/overzicht-bgk', jsonParser, (req, res) => {
  const i = req.body.chunkIndex;
  console.log(`index is ${i}`)

  res.setHeader('Access-Control-Allow-Origin', '*')

  setTimeout((() => {
    res.status(200).send({ "total_size": tableData.content.length, "chunkIndex": i, "chunkSize": n, "content": tableData.content.slice(n * i, n * (i + 1)) })
  }), 100)

})


app.post('/case/overzicht-bgk/latestBookings', jsonParser,(req, res) => {
  const contactType = String(req.body.contactType);
  const werkCodes = req.body.werkCodes;
  const praktijken = req.body.folders;
  const i = req.body.chunkIndex;

  console.log(` ${new Date()} latestBooking called for type "${contactType}" en werkCodes:${werkCodes}, praktijken:${praktijken}, chunkIndex:${i}`);
  res.setHeader('Access-Control-Allow-Origin', '*')

  // append uppercase letters from contactType
  console.log(typeof (contactType))
  const postfix = [...contactType].filter(e => /[A-Z]/.test(e)).join('')

  res.status(200).send(latestBookingsData.slice(n * i, n * (i + 1)).map(e => { return { 'caseId': e.caseId, 'datum': e[contactType] } }));

})

app.post('/api/uren/getbysheetdate', bodyParser.raw({'type': 'application/json'}), (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(urenData);
})
app.get('/api/declaration', bodyParser.raw({'type': 'application/json'}), (req, res) => {

  console.log('api declr')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(declarationData);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
