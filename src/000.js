const express = require('express')
const { execFile } = require('child_process')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const app = express()
const port = process.env.PORT || 3000

app.use(helmet())
app.use(express.json())
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }))

function runScript(res, scriptPath, args = []) {
  execFile(scriptPath, args, { windowsHide: true }, (err, stdout, stderr) => {
    if (err) {
      console.error(`error running ${scriptPath}:`, err)
      return res.status(500).send(stderr || 'Internal error')
    }
    return res.send(stdout)
  })
}

app.get('/', (req, res) => runScript(res, 'bin/001'))
app.get('/aws', (req, res) => runScript(res, 'bin/002'))
app.get('/docker', (req, res) => runScript(res, 'bin/003'))

app.get('/loadbalanced', (req, res) => {
  // Only pass a safe subset of headers for demo purposes
  const safeHeaders = {
    host: req.headers.host,
    'user-agent': req.headers['user-agent']
  }
  runScript(res, 'bin/004', [JSON.stringify(safeHeaders)])
})

app.get('/tls', (req, res) => {
  const safeHeaders = { host: req.headers.host }
  runScript(res, 'bin/005', [JSON.stringify(safeHeaders)])
})

app.get('/secret_word', (req, res) => {
  // Do not accept secret via headers; this demo reads from env only
  runScript(res, 'bin/006', [process.env.SECRET_WORD || ''])
})

app.listen(port, () => console.log(`Rearc quest listening on port ${port}!`))
