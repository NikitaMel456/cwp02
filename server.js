const net = require('net');
const nessString='QA';
const clshutdown='DEC';
const claccepted='ACK';
const port = 8124;

const server = net.createServer((client) => {
    console.log('Client connected');

    client.setEncoding('utf8');

    client.on('data', (data,err)=> {
        if(err){console.log(err.message.toString());}
         else if (data.toString()===nessString.toString()){
            console.log(data);
            client.id = Date.now();
            console.log(claccepted+`,client №`+client.id+` accepted`);
           client.write(claccepted);
        }
        else if(data.toString()!==nessString.toString()){
console.log(clshutdown+`, client №`+client.id+` sent wrong line`);
            client.write(clshutdown);
        }
    });

    client.on(`end`, () => console.log(`Client №`+client.id+` disconnected`));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});