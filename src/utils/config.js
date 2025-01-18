import Web3 from "web3";
import { abi } from "./abi";

export let web3 = new Web3(window.ethereum);

export async function connectWallet() {
  await window.web3.currentProvider.enable();
  window.web3 = new Web3(window.web3.currentProvider);
}

export const contractAddress = "0x35F44c06802F74a84201Bba9b9ACe1CD62cb553f";
export const contract = new web3.eth.Contract(abi, contractAddress);
