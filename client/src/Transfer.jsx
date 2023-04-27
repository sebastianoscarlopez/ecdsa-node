import { useEffect, useState } from "react";
import server from "./server";
import { unsecureSignature, unsecureWallets } from "./fake-terminal/unsecureSignature";
import FakeTerminal from "./fake-terminal";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);
  const [message, setMessage] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, { signature, recoveryBit, message, publicKey });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  useEffect(() => {
    setSignature("");
    setMessage("");
    const amount = parseInt(sendAmount);
    if (address.length > 0 && amount > 0 && recipient.length > 0) {
      unsecureSignature({ sender: address, amount, recipient })
        .then(({ signature, message, recoveryBit, publicKey }) => {
          setSignature(signature);
          setMessage(message);
          setRecoveryBit(recoveryBit);
          setPublicKey(publicKey);
        })
        .catch((ex) => console.error(ex));
    }
  }, [address, sendAmount, recipient]);

  return (
    <>
      <form className="container transfer" onSubmit={transfer}>
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>

        <input type="hidden" name="signature" value={signature} />
        <input type="hidden" name="recoveryBit" value={recoveryBit} />
        <input type="hidden" name="message" value={message} />
        <input type="hidden" name="publicKey" value={publicKey} />

        <input type="submit" className="button" value="Transfer" />
      </form>
      <FakeTerminal
        commands={[
          `Signing transaction: $${sendAmount} from ${recipient} to ${recipient}`,
          signature,
          '#### Here some wallets to test ####',
          ...unsecureWallets.map((wallet) => `address: 0x${wallet.address}`),
        ]}
      />
    </>
  );
}

export default Transfer;
