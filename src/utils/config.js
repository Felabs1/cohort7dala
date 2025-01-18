import Web3 from "web3";
import { abi } from "./abi";

export let web3 = new Web3(window.ethereum);

export async function connectWallet() {
  await window.web3.currentProvider.enable();
  window.web3 = new Web3(window.web3.currentProvider);
}
