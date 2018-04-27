const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');;
});

/*server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});*/

//There is apparently a difference between ' and ` here
//the commented code above doesn't do the variable replacement that we see in the uncommented code
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
