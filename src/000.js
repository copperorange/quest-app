const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()
const port = 3000

// Rate limiting: 60 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: 'Too many requests, please try again later.'
})

app.use(limiter)

app.get('/', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/001', (err, stdout, stderr) => {
    if (err) {
      return res.send(`${stderr}`);
    }
    return res.send(`${stdout}`);
  });
});

app.get('/aws', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/002', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/docker', function (req, res) {
  const { exec } = require('child_process');
  exec('bin/003', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/loadbalanced', function (req, res) {
  const { exec } = require('child_process');
  // Only pass safe, known headers to prevent command injection
  const safeHeaders = {
    host: req.headers.host || '',
    'user-agent': (req.headers['user-agent'] || '').substring(0, 200)
  };
  exec('bin/004 ' + JSON.stringify(safeHeaders), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/tls', function (req, res) {
  const { exec } = require('child_process');
  // Only pass safe, known headers to prevent command injection
  const safeHeaders = {
    host: req.headers.host || ''
  };
  exec('bin/005 ' + JSON.stringify(safeHeaders), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/secret_word', function (req, res) {
  const { exec } = require('child_process');
  // Only pass safe, known headers to prevent command injection
  const safeHeaders = {
    host: (req.headers.host || '').substring(0, 100)
  };
  exec('bin/006 ' + JSON.stringify(safeHeaders), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.listen(port, () => console.log(`Rearc quest listening on port ${port}!`))
