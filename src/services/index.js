import Authereum from "authereum";
import Web3 from "web3";
import * as contract from "@truffle/contract";

import MCDAwarePool from "../pooltogether-contracts/build/contracts/MCDAwarePool.json"
import ERC20 from "../pooltogether-contracts/build/contracts/ERC20.json"

import * as BigNumber from "bignumber.js"

let web3
let authereum

export const getWeb3 = async () => {
    authereum = new Authereum("kovan");
    console.log("1authereum", authereum);
    const provider = await authereum.getProvider();
    console.log("1privder", provider);

    
    if (window.ethereum) {
        web3 = new Web3(window.ethereum)
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
    } else {
        web3 = new Web3(authereum.getProvider())
    }

    console.log("1web3", web3);

    window.web3 = web3;


    web3.currentProvider.enable().then(async () => {
      const accounts = await web3.eth.getAccounts(); // ['0x...']
      console.log('accounts', accounts)  

      return accounts
    });
}

export const getAutheremInstance = async () => {
    if(!web3){
        await getWeb3()
    }

    return authereum
}

export const depositToPoolTogether = async (amount) => {
    if(!web3){
        await getWeb3()
    }

    const accounts = await web3.eth.getAccounts();
    const poolContract = contract(MCDAwarePool)
    poolContract.setProvider(web3.currentProvider)
    const poolInstance = await poolContract.at('0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663')

    const daiContract = contract(ERC20)
    daiContract.setProvider(web3.currentProvider)
    const daiInstance = await daiContract.at('0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa')

    const depositAmount = new BigNumber(amount * new BigNumber(10 ** 18))

    await daiInstance.approve('0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663', depositAmount, {from: accounts[0]})
    await poolInstance.depositPool(depositAmount, {from: accounts[0]})
    const currentBalance = await poolInstance.committedBalanceOf(accounts[0])
    console.log(currentBalance.toString(), 'curretbaalce')
    
}