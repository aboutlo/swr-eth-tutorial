import React, { useState } from "react";
import styled from "styled-components";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
  createWeb3ReactRoot,
} from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR, { SWRConfig } from "swr";
import { createWatcher, aggregate } from "@makerdao/multicall";
import { Wallet } from "./Wallet";

function getLibrary(provider: any): Web3Provider {
  console.log({ provider });
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

// Contract addresses used in this example
const MKR_TOKEN = "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd";
const MKR_WHALE = "0xdb33dfd3d61308c33c63209845dad3e6bfb2c674";
const MKR_FISH = "0x2dfcedcb401557354d0cf174876ab17bfd6f4efd";

// const config = { preset: "rinkeby" };

const Container = styled.div`
  border: 1px solid #ccc;
  font-family: monospace;
  white-space: pre;
`;

// Create watcher
/*const watcher = createWatcher(
  [
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", (val) => val / 10 ** 18]],
    },
  ],
  config
);

// Subscribe to state updates
watcher.subscribe((update) => {
  console.log(`Update: ${update.type} = ${update.value}`);
});

// Subscribe to batched state updates
watcher.batch().subscribe((updates) => {
  // Handle batched updates here
  // Updates are returned as { type, value } objects, e.g:
  // { type: 'BALANCE_OF_MKR_WHALE', value: 70000 }
});

// Subscribe to new block number updates
watcher.onNewBlock((blockNumber) => {
  console.log("New block:", blockNumber);
});*/

// Start the watcher polling
/*watcher.start();*/

export const App = () => {
  return <Web3ReactProvider getLibrary={getLibrary} children={<Wallet />} />;
};
