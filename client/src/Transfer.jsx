import { useEffect, useState } from "react";
import server from "./server";
import { unsecureSignature } from "./terminal/unsecureSignature";
import Terminal from "./Terminal";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("123");
  const [recipient, setRecipient] = useState(
    "0x0efe7cbe0b6e28de7543eaf0af4a02a1b0cf0856"
  );
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);
  const [message, setMessage] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, { signature, recoveryBit, message });
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
        .then(({ signature, message, recoveryBit }) => {
          setSignature(signature);
          setMessage(message);
          setRecoveryBit(recoveryBit);
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

        <input type="submit" className="button" value="Transfer" />
      </form>
      <Terminal
        commands={[
          `Signing transaction: $${sendAmount} from ${recipient} to ${recipient}`,
          signature,
        ]}
      />
    </>
  );
}

export default Transfer;
