import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

// declare global {
//   interface Window {
//     ethereum: any;
//   }

//   interface ethers {
//     util: any;
//     // providers: any;
//   }
// }

function App() {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // Properties

  const [walletAddress, setWalletAddress] = useState("");

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function ConnectMetamask() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function Transfer() {
    if (typeof window.ethereum !== 'undefined') {
      await ConnectMetamask();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const tx = {
        from: walletAddress,
        to: input2,
        value: ethers.utils.parseUnits(input1, "ether").toHexString()
      }

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });



    }
  }

  return (
    <div className="App">
      <button onClick={ConnectMetamask}>Connect MetaMask</button>
      <h3>Wallet Address: {walletAddress}</h3>
      <div>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter Value in ETH"
        />
      </div>

      <div>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter Receiver Address"
        />
      </div>{' '}


      <button onClick={Transfer}>Tranasfer</button>
    </div>
  );
}

export default App;
