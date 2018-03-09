const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const thomasCoin = require('./main'); 

app.use(bodyParser.json())

app.get('/', (req, res) => res.send("Peer is Running"));

app.post('/create-transaction', (req, res) => {
    const { toAdress, fromAdress, amount } = req.body;

    if(!toAdress || !fromAdress || !amount)
        res.sendStatus(400).statusMessage("Missing Parameters");

    const trans = thomasCoin.createTransaction(toAdress, fromAdress, amount);

    res.send({ trans, pending: thomasCoin.pendingTransactions});
});

app.listen(3000, console.log("peer is listening on port 3000"));