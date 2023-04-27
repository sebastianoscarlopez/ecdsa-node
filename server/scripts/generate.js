const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require("ethereum-cryptography/keccak")

function getAddress(publicKey) {
  const publicKeyWithoutFormat = publicKey.slice(1)
  return keccak256(publicKeyWithoutFormat).slice(-20)
}

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const address = getAddress(publicKey)

console.log({
  privateKey: toHex(privateKey),
  publicKey: toHex(publicKey),
  address: toHex(address),
})


/*** Server balance and client fake metamask are using this ***
[
  {
    privateKey: 'c65b62bdc1f346764a620dd1a70aed8ad259ee8dffa6560ee2ec4f81d9d25f82',
    publicKey: '02e6cf6447c1e7c64dec2048834870abcbd6eb8dbd150c84c9e53ad152ce1a2a97',
    address: 'a3c860d9effd154da58230de6a525e629afafcaa'
  },
  {
    privateKey: 'd746eba3aa0b3ce05c3549549ce48fb35762a36518665a9060d45953bd6c169c',
    publicKey: '021f2cd45a6e41d70122cd1fc88416d9cde54c42260cfa1eda6a4bf50ae92b859e',
    address: '0efe7cbe0b6e28de7543eaf0af4a02a1b0cf0856'
  },
  {
    privateKey: '03ec34476aa2dc8e8a4df493fd27265847b0f425391e3c506533985816159123',
    publicKey: '03dd799af9a203a083c722385ce1ec4f0efd31655d05587bb593da82579bb82148',
    address: 'aec5f2ffc7471091e338599eda54f135c101aff8'
  }
]
*/