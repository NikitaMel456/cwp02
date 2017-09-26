const net = require('net');
const fs=require('fs');
const http=require('http');
const nessString='QA';
const clshutdown='DEC';
const claccepted='ACK';
const port = 8124;
let logg=fs.createWriteStream('serverlogger.log');


const server = net.createServer((client) => {
    console.log('Client connected');
    client.setEncoding('utf8');
    client.id = Date.now();
    client.on('data', (data,err)=> {
        if(err){console.log(err.message.toString());}
        else if (data.toString()===nessString.toString()){
            console.log(data);

            console.log(claccepted+`,client №`+client.id+` accepted`);
            logg.write(claccepted+`,client №`+client.id+` accepted`+'\n');
            client.write(claccepted);
        }
        else if(data.toString()!==nessString.toString()){
           // console.log(clshutdown+`, client №`+client.id+` sent wrong line`);
            console.log('Client\'s question: '+data);
            logg.write('Client\'s question: '+data+'\n');
            let answer=Math.floor(Math.random() * (1 - 0 + 1)) + 0;

            console.log('Client\'s question: '+data+'. Answer: '+answer+' (1-yes,0-no)');
            logg.write('Client\'s question: '+data+'. Answer: '+answer+' (1-yes,0-no)'+'\n');
            client.write(answer.toString());
           // client.write(clshutdown);

        }
    });

    client.on(`end`, () => {console.log(`Client №`+client.id+` disconnected`);
   logg.write(`Client №`+client.id+` disconnected`+'\n'); });
});

server.listen(port,'127.0.0.1', () => {
    console.log(`Server listening on localhost:${port}`);
});



