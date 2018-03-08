const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock); 
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let thomasCoin = new Blockchain();
thomasCoin.addBlock(new Block(1, "01/01/2018", { amount: 4 }));
thomasCoin.addBlock(new Block(2, "04/01/2018", { amount: 12 }));

console.log("Is thomasCoin Valid?: " + thomasCoin.isChainValid());
thomasCoin.chain[1].data = { amount: 50 };
thomasCoin.chain[1].hash = thomasCoin.chain[1].calculateHash();
console.log("Is thomasCoin Valid?: " + thomasCoin.isChainValid());
// console.log(JSON.stringify(thomasCoin, null, 4));