const express = require('express');
const app = express();
const cors = require('cors');
const client = require('twilio')('AC60427f6a515d27b1338729d95a48f8b9', 'b3cbbcd6dc7a393b4d1759dcc4311e45');
var bodyParser = require('body-parser')

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.bodyParser())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/send', urlencodedParser, function(req, res) {
  console.log('message ' + req.body.message)
  client.messages.create({
      from: 'whatsapp:+14155238886',
      body: req.body.message.toString(),
      to: req.body.number.toString()
  })
  res.send('whatsapp message sent')
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});