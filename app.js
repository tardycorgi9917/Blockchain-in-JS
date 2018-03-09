const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const thomasCoin = require('./main'); 

app.use(bodyParser.json())

app.get('/', (req, res) => res.send("Peer is Running"));

app.post('/transaction/new', (req, res) => {
    const { toAdress, fromAdress, amount } = req.body;

    if(!toAdress || !fromAdress || !amount)
        res.sendStatus(400).statusMessage("Missing Parameters");

    const trans = thomasCoin.createTransaction(toAdress, fromAdress, amount);

    res.send({ trans, pending: thomasCoin.pendingTransactions});
});

app.post('/mine', (req, res) => {
    const block = thomasCoin.minePendingTransactions();

    res.send(block);
});

app.post('/chain', (req, res) => res.send(thomasCoin.chain));

app.post('/node/register', (req, res) => {
    const { node } = req.body;
    thomasCoin.registerNode(node);
    req.sendStatus(204);
});

app.listen(3000, console.log("Peer is listening on port 3000"));