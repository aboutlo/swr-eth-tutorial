import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import {fetcher, Networks, shorter} from "../utils";
import {SWRConfig} from "swr";
import ERC20ABI from "../abi/ERC20.abi.json";
import {EthBalance} from "./EthBalance";
import {TokenList} from "./TokenList";
import {InjectedConnector} from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
  ],
})

export const Wallet = () => {
  const { chainId, account, library, activate, active } = useWeb3React<
      Web3Provider
      >()

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
      <div>
        <div>ChainId: {chainId}</div>
        <div>Account: {shorter(account)}</div>
        {active ? (
            <div>✅ </div>
        ) : (
            <button type="button" onClick={onClick}>
              Connect
            </button>
        )}
        {active && (
            <SWRConfig value={{ fetcher: fetcher(library, ERC20ABI) }}>
              <EthBalance />
              <TokenList chainId={chainId} />
            </SWRConfig>
        )}
      </div>
  )
}
