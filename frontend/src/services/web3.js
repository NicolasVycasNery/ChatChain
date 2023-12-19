import Swal from 'sweetalert2';
import contractABI from '../contracts/Chat.json';
import { ethers } from 'ethers';

const RPC_URL = "http://localhost:8545";
const ContractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

console.log("Contract Address: ", ContractAddress, "is valid address: ", ethers.isAddress(ContractAddress));

var web3Provider;
var signer;
var provider;
var contractSinger;
var contractProvider;

async function loadWeb3() {
    if (web3Provider && signer && provider) {
        return { web3Provider, signer, provider }
    }
    web3Provider;
    // Modern dapp browsers...
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3Provider = window.ethereum;
        } catch {
            alert("User denied account access...");
            return;
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please install metamask to use this dApp!',
        })
        throw new Error("Please install metamask to use this dApp!");
    }

    provider = new ethers.JsonRpcProvider(
        RPC_URL
    )
    signer = await provider.getSigner(
        window.ethereum.selectedAddress
    );
    return { signer, provider, web3Provider }
}

async function getSingerContract() {
    if (contractSinger) {
        return contractSinger;
    }
    const { abi } = contractABI;
    const { provider } = await loadWeb3();
    // load contract
    contractSinger = new ethers.Contract(ContractAddress, abi, provider);
    return contractSinger;
}

async function getProviderContract() {
    if (contractProvider) {
        return contractProvider;
    }
    const { abi } = contractABI;
    const { signer } = await loadWeb3();
    // load contract
    contractProvider = new ethers.Contract(ContractAddress, abi, signer);
    return contractProvider;
}

export async function send(message) {
    const contract = await getProviderContract();
    const tx = await contract.send(message);
    await tx.wait();
}

export async function get(page, pageSize) {
    const contract = await getSingerContract();
    const messages = await contract.get(page, pageSize);
    return messages.map((message) => {
        const [text, sender, timestamp] = message;
        
        return {
            text,
            sender,
            timestamp: new Date(Number(timestamp) * 1000),
        }
    })
}

export async function count() {
    const contract = await getSingerContract();
    const count = await contract.count();
    return count;
}
