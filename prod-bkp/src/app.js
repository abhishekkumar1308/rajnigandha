const { app,express } = require("./server");
const fs = require('fs');
const https = require('https');
const path = require('path');

// Serve static files
app.use("/feeds", express.static(path.join(__dirname, "../feeds")));

// SSL Certificates
//const privateKey = fs.readFileSync('/etc/ssl/private/private.key', 'utf8');
const privateKey = fs.readFileSync('/etc/ssl/private/rajnigandha.com.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/certs/star.rajnigandha.com.crt', 'utf8');
const ca = [
  fs.readFileSync('/etc/ssl/certs/Root.crt', 'utf8'),
  fs.readFileSync('/etc/ssl/certs/Intermediate.crt', 'utf8')
];

// HTTPS Server
https.createServer({
  key: privateKey,
  cert: certificate,
  ca: ca
}, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});
app.get('/', (req, res) => {
  res.send('Welcome to Product Feed!');
});
