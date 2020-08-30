// var http = require('http');
// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World');
// }).listen(8081);

// console.log('Server running at http://127.0.0.1:8081/');
const http = require('http')
const url = require('url')
http.createServer((req, res) => {
    const o = url.parse(req.url, true)
    console.log(o.query.aa)
    
    res.writeHead(200, {'Content-type': 'text/html;charset="utf-8"'})
    res.write('你好 this is nodejs')
    res.end()
}).listen(3000)
