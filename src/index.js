// const fs = require('fs');
// const http = require('http');
// const url = require('url');

import './assets/css/reset.css'
import './assets/css/fonts.css'
import './assets/css/style.css'
import './js/assets'
// import './js/controller'

// const server = http.createServer((req, res) => {
//     const pathName = url.parse(req.url, true).pathname;
//     const id = url.parse(req.url, true).query.id;

//     if (pathName === '/') {
//         res.writeHead(200, { 'Content-type': 'text/html'});

//         fs.readFile(`/index.html`, 'utf-8', (err, data) => {
//             let overviewOutput = data;
//             res.end(overviewOutput);
//         });
//     }
// });

// server.listen(1337, '127.0.0.1', () => {
//     console.log('Listening for requests now');
// });