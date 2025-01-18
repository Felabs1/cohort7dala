import { useState, useEffect } from "react";
import { web3 } from "./utils/config";
import { connectWallet } from "./utils/config";
import { contract } from "./utils/config";

function App() {
  const [accounts, setAccounts] = useState(null);

  const viewMessage = async () => {
    const data = await contract.methods.getGreeting().call();
    console.log(data);
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

      <input type="text" />
      <button onClick={viewMessage}>view greeting</button>
      <button>SetGreeting</button>

      <p>Greeting</p>
    </div>
  );
}

export default App;
