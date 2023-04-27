const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0xa3c860d9effd154da58230de6a525e629afafcaa": 100,
  "0x0efe7cbe0b6e28de7543eaf0af4a02a1b0cf0856": 50,
  "0xaec5f2ffc7471091e338599eda54f135c101aff8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { message, signature, publicKey } = req.body;
  const { sender, recipient, amount } = JSON.parse(message);

  function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    // hash the message using keccak256
    return keccak256(bytes);
  }
  
  const isValidSignature = secp.verify(signature, toHex(hashMessage(message)), publicKey);

  if(!isValidSignature) {
    res.status(400).send({ message: "Invalid signature" });
    return
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

module.exports = app;