import Authereum from "authereum";
import Web3 from "web3";
import * as contract from "@truffle/contract";

import MCDAwarePool from "../pooltogether-contracts/build/contracts/MCDAwarePool.json";
import ERC20 from "../pooltogether-contracts/build/contracts/ERC20.json";
import BasePool from "../pooltogether-contracts/build/contracts/BasePool.json";
import cDAI from "../pooltogether-contracts/build/contracts/CErc20Mock.json";

import { ethers } from "ethers";
import * as BigNumber from "bignumber.js";
import { poolTogetherDrawDates } from "../utils";

import * as pt from "pooltogetherjs";
const { utils } = ethers;

let web3;
let authereum;

const getPoolTogetherDaiDrawDate = () => {
  const now = Date.now();
  for (let i = 0; i < poolTogetherDrawDates.length; i += 1) {
    const drawDate = new Date(poolTogetherDrawDates[i]);
    // const diff = getDateDiff(drawDate, now);
    var diff = parseInt((drawDate - now) / (1000 * 60 * 60 * 24), 10);
    if (diff > 0) {
      return poolTogetherDrawDates[i];
    }
  }
  return undefined;
};

export const getEstimatedPrize = async (contractAddress) => {
  let provider = ethers.getDefaultProvider();
  const abi = BasePool;
  const contract = new ethers.Contract(contractAddress, abi["abi"], provider);
  console.log("contract", contract);

  const accountedBalance = await contract.accountedBalance();

  const balanceCallData = contract.interface.functions.balance.encode([]);
  const result = await provider.call({
    to: contract.address,
    data: balanceCallData,
  });
  const balance = contract.interface.functions.balance.decode(result);

  const currentOpenDrawId = await contract.currentOpenDrawId();
  const currentDraw = await contract.getDraw(currentOpenDrawId);

  let prize = ethers.utils.bigNumberify(0);
  if (balance) {
    prize = pt.utils.calculatePrize(
      balance,
      accountedBalance,
      currentDraw.feeFraction
    );

    console.log("prize", prize.toString());

    const cDAIContract = new ethers.Contract(
      "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
      cDAI["abi"],
      provider
    );

    const supplyRatePerBlock = await cDAIContract.supplyRatePerBlock();
    console.log("suppluRateperBlock", supplyRatePerBlock);

    const prizeSupplyRate = pt.utils.calculatePrizeSupplyRate(
      supplyRatePerBlock,
      currentDraw.feeFraction
    );

    const awardAtMs = Date.parse(getPoolTogetherDaiDrawDate());
    const remainingTimeS = (awardAtMs - new Date().getTime()) / 1000;
    const remainingBlocks = remainingTimeS / 15; // about 15 second block periods
    const blocksFixedPoint18 = utils.parseEther(String(remainingBlocks));
    const prizeEstimate = pt.utils.calculatePrizeEstimate(
      balance,
      prize,
      blocksFixedPoint18,
      prizeSupplyRate
    );

    const newPrizeEstimate = prizeEstimate / new BigNumber(10 ** 18);

    console.log("prizeEstimate", prizeEstimate);
    console.log("prizeEstimate", newPrizeEstimate.toString());

    return Math.round(newPrizeEstimate.toString());
  }
};

export const getWeb3 = async () => {
  authereum = new Authereum("kovan");
  console.log("1authereum", authereum);
  const provider = await authereum.getProvider();
  console.log("1privder", provider);

//   if (window.ethereum) {
//     web3 = new Web3(window.ethereum);
//   } else if (window.web3) {
//     web3 = new Web3(window.web3.currentProvider);
//   } else {
//     web3 = new Web3(authereum.getProvider());
//   }

  web3 = new Web3(authereum.getProvider());

  console.log("1web3", web3);
  window.web3 = web3;

  return web3.currentProvider.enable().then(async () => {
    const accounts = await web3.eth.getAccounts(); // ['0x...']
    console.log("accounts", accounts);

    return accounts;
  });
};

export const getAutheremInstance = async () => {
  if (!web3) {
    await getWeb3();
  }

  return authereum;
};

export const depositToPoolTogether = async (amount) => {
  if (!web3) {
    await getWeb3();
  }

  const accounts = await web3.eth.getAccounts();
  const poolContract = contract(BasePool);
  poolContract.setProvider(window.web3.currentProvider);
  const poolInstance = await poolContract.at(
    "0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663"
  );

  const daiContract = contract(ERC20);
  daiContract.setProvider(window.web3.currentProvider);
  const daiInstance = await daiContract.at(
    "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
  );

  const depositAmount = new BigNumber(amount * new BigNumber(10 ** 18));

  await daiInstance.approve(
    "0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663",
    depositAmount,
    { from: accounts[0] }
  );
  await poolInstance.depositPool(depositAmount, { from: accounts[0] });
  const currentBalance = await poolInstance.committedBalanceOf(accounts[0]);
  console.log(currentBalance.toString(), "curretbaalce");

  //   let provider = new ethers.providers.Web3Provider(
  //     window.web3.currentProvider
  //   )
  // const abi = BasePool
  // const poolInstance = new ethers.Contract("0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663", abi["abi"], provider);
  // console.log("contract", poolInstance);

  // const daiInstance = new ethers.Contract("0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", ERC20["abi"], provider);
  // console.log('daicontract', daiInstance)

  // const depositAmount = utils.bigNumberify(amount).mul(utils.bigNumberify(10).pow(utils.bigNumberify(18)))
  // console.log(depositAmount.toString())

  // const txhash = await daiInstance.approve(
  // "0xC3a62C8Af55c59642071bC171Ebd05Eb2479B663",
  // depositAmount,
  // ).sendTransaction({from: accounts[0]});

  // console.log('approve', txhash)

  // const txhash1 = await poolInstance.depositPool(depositAmount).sendTransaction({from: accounts[0]});;
  // console.log('deposit', txhash1)

  // const currentBalance = await poolInstance.committedBalanceOf(accounts[0]);
  // console.log(currentBalance.toString(), "curretbaalce");
};
