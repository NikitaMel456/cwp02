const net = require('net');
const clString='QQ';
const clshutdown='DEC';
const claccepted='ACK';
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
    console.log(`Connected`);
    client.write(clString);
});

client.on('data', function(data) {
    console.log(`asdasda`);
   if(data.toString()===clshutdown.toString()){
    console.log(`dsfsdfsd`);
    client.destroy();}
   else if (data.toString()===claccepted.toString()){console.log(data.toString());}
   else {console.log(data.toString());console.write(data.toString());}
});

client.on('close', function() {
    console.log(`Connection closed`);
});