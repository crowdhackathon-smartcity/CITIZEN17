var exec = require('child_process').exec;
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var express = require('express');
var app = express();

var PORT = 8009;
var HOST = '0.0.0.0';
var TX_FEE = 37000;
var TX_VALUE = 40000;

// WIF
var citizenPrivateKey = 'XXX';
var citizenAddress = '17t4vAk36J9oBxU2UgwXmxvsvPsV2NnzV5';
var municipalityAddress = '1HVjPkbyWY9m2vfDSmFR2Kx5Sy3szw7b1A';

function getUnspentHistory(addr, cb) {
    var cmd = 'python history.py';

    exec(cmd, function(err, stdout, stderr) {
        var json = stdout;
        json = json.replace(/'/g, '"');
        json = json.replace(/u"/g, '"');
        json = json.replace(/None/g, 'false');
        var unspentHistory = JSON.parse(json);
        // console.log('err: ', err);
        // console.log('stdout: ', unspentHistory);
        // console.log('stderr: ', stderr);

        var tx = unspentHistory[0];
        var outputParts = tx.output.split(':');
        var txId = outputParts[0];
        var outputIdx = outputParts[1];
        var satoshiValue = tx.value;

        if (unspentHistory.length != 1) {
            console.log('Found multiple spendable outputs - abort');
            return;
        }

        console.log('Found spendable citizen output: ');
        console.log('Spendable txid: ', txId);
        console.log('Spendable output index: ', outputIdx);
        console.log('Spendable output value (satoshis): ', satoshiValue);

        cb(txId, outputIdx, satoshiValue);
    });
}

app.post('/pay', function(req, res) {
    console.log('Received payment request');

    getUnspentHistory(citizenAddress, function(txId, outputIdx, value) {
        console.log('Spending transaction');

        var tx = new bitcoin.TransactionBuilder();

        // Single input
        tx.addInput(txId, +outputIdx);

        var changeValueSatoshi = value - TX_VALUE - TX_FEE;

        // Two outputs
        // Normal output
        console.log('Municipality bitcoin address: ', municipalityAddress);
        console.log('Value sent to municipality (satoshis): ', TX_VALUE);
        tx.addOutput(municipalityAddress, TX_VALUE);
        console.log('Citizen change address: ', citizenAddress);
        console.log('Change (satoshis): ', changeValueSatoshi);
        console.log('Fee (satoshis): ', TX_FEE);

        // Change output
        tx.addOutput(citizenAddress, changeValueSatoshi);

        // Initialize a private key using WIF
        var keyPair = bitcoin.ECPair.fromWIF(citizenPrivateKey);

        // Sign the first input with the new key
        tx.sign(0, keyPair)

        console.log('Transaction signed');

        // Print transaction serialized as hex
        var txhex = tx.build().toHex();
        var txid = tx.build().getId();

        console.log('Transaction hex: ');
        console.log(txhex);
        // => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...
        //

        console.log('Broadcasting transaction');
        // pushtx(txhex);
        console.log('Transaction broadcasted');
        console.log('Transaction id: ', txid);

        informpayment();

        function informpayment() {
            request.post({
                    url: 'http://vitsalis.com:8010/payment/',
                    form: {
                        paid: 100
                    }
                },
                (err, resp, body) => {
                    console.log('Payment result: ', body);
                }
            );
        }

        function pushtx(txhex) {
            // Now push the transaction onto the Bitcoin network manually

            request.post({
                    url: 'https://blockchain.info/pushtx',
                    form: {
                        tx: txhex
                    }
                },
                (err, resp, body) => {
                    // console.log('error: ', err);
                    // console.log('response: ', resp);
                    console.log('Broadcast result: ', body);
                }
            );
        }

        res.send('Payment successful');
    });
});

console.log('Crowdhackathon SmartCity CITIZEN17 blockchain connection');

app.listen(PORT, HOST, function() {
    console.log('Express listening for payment requests on ', HOST, ':', PORT);
});
