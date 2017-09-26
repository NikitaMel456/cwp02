
const net = require('net');
const http = require('http');
const shuffle = require('shuffle-array');
const fs = require('fs');
const clString = 'QA';
const clshutdown = 'DEC';
const claccepted = 'ACK';
let curQuest;
let ind=0;
let questions=[];



const client = new net.Socket();
client.port=8124;
client.setEncoding('utf8');

client.connect(client.port,'127.0.0.1' ,function () {
    console.log(`Connected`);
    fs.readFile('qa.json',function (err,ques) {
        if (!err) {
            questions = JSON.parse(ques);
            shuffle(questions);
            client.write(clString);
        }
        else {console.log('Error while reading json file');}
    });
});

    client.on('data', function (data) {
        console.log(`asdasda`);
        let serverANSW;
        if (data.toString() === clshutdown.toString()) {
            client.destroy();
        }
        else if (data.toString() === claccepted.toString()) {
            console.log('Server connection answer: ' + data.toString() + '. (ACK-connection allowed,DEC-connection refused)');

            if (ind < questions.length) {

                curQuest = questions[ind].qn;

                client.write(curQuest);
                ind++;
            }
            else {client.destroy();}
        }
        else {
            if (data.toString() === '0') serverANSW = questions[ind].answerNO;
            else if (data.toString() === '1') serverANSW = questions[ind].answerYES;
            console.log(questions[ind].qn);
            console.log('Answer: ' + questions[ind].answerYES);
            console.log('Server\'s answer: ' + serverANSW);

        }
    });

client.on('close', function () {
    console.log(`Connection closed`);
});
