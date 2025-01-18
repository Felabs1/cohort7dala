import { useState, useEffect } from "react";
import { web3 } from "./utils/config";
import { connectWallet } from "./utils/config";
import { contract } from "./utils/config";

function App() {
  const [accounts, setAccounts] = useState(null);
  const [inputText, setInputText] = useState("");

  const viewMessage = async () => {
    const data = await contract.methods.getGreeting().call();
    console.log(data);
  };

  const setData = async () => {
    const gas = await contract.methods
      .setGreeting(inputText)
      .estimateGas({ from: accounts });

    const tx = await contract.methods
      .setGreeting(inputText)
      .send({ from: accounts, gas });
    console.log(tx);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccounts(accounts[0]);
          return accounts[0];
        } else {
          console.log("no accounts were found");
          return null;
        }
      } catch (e) {
        console.error("error connecting to wallet " + e);
        return null;
      }
    } else {
      console.log("you need to install your metamask");
    }
  };
  return (
    <div>
      {accounts ? (
        <p>{accounts}</p>
      ) : (
        <button onClick={connectWallet}>connect wallet</button>
      )}

      <input
        type="text"
        onChange={(e) => {
          console.log(e.target.value);
          setInputText(e.target.value);
        }}
      />
      <button onClick={viewMessage}>view greeting</button>
      <button onClick={setData}>SetGreeting</button>

      <p>Greeting</p>
    </div>
  );
}

export default App;
