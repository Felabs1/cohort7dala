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

  const checkConnection = () => {
    let accounts = web3.eth.getAccounts();
    if (accounts) {
      // do something

      setAccounts(accounts);
    } else {
      // do something
    }
  };
  return (
    <div>
      {accounts ? (
        <p>connected</p>
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
