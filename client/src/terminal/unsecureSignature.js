import { sign } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

const unsecureWallets = [
  {
    privateKey:
      "c65b62bdc1f346764a620dd1a70aed8ad259ee8dffa6560ee2ec4f81d9d25f82",
    publicKey:
      "02e6cf6447c1e7c64dec2048834870abcbd6eb8dbd150c84c9e53ad152ce1a2a97",
    address: "a3c860d9effd154da58230de6a525e629afafcaa",
  },
  {
    privateKey:
      "d746eba3aa0b3ce05c3549549ce48fb35762a36518665a9060d45953bd6c169c",
    publicKey:
      "021f2cd45a6e41d70122cd1fc88416d9cde54c42260cfa1eda6a4bf50ae92b859e",
    address: "0efe7cbe0b6e28de7543eaf0af4a02a1b0cf0856",
  },
  {
    privateKey:
      "03ec34476aa2dc8e8a4df493fd27265847b0f425391e3c506533985816159123",
    publicKey:
      "03dd799af9a203a083c722385ce1ec4f0efd31655d05587bb593da82579bb82148",
    address: "aec5f2ffc7471091e338599eda54f135c101aff8",
  },
];

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  // hash the message using keccak256
  return keccak256(bytes);
}

const signMessage = async (msg, privateKey) => {
  const hashMsg = hashMessage(msg);
  
  const [signed, recoveryBit] = await sign(hashMsg, privateKey, {
    recovered: true,
  });

  return {
    signature: toHex(signed),
    recoveryBit,
  };
};

const chop0x = (str) => str.replace(/^0x/, "");
export const unsecureSignature = async ({ sender, recipient, amount }) => {
  const { privateKey } = unsecureWallets.find((w) =>chop0x(w.address) === chop0x(sender));
  const message = JSON.stringify({
    sender,
    recipient,
    amount,
    timeStamp: Date.now(),
  });

  const { signature, recoveryBit } = await signMessage(message, privateKey);

  return {
    signature,
    recoveryBit,
    message,
  };
};
