import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import {fetcher, Networks, shorter} from "../utils";
import {SWRConfig} from "swr";
import ERC20ABI from "../abi/ERC20.abi.json";
import {EthBalance} from "./EthBalance";
import {TokenList} from "./TokenList";
import {InjectedConnector} from "@web3-react/injected-connector";
import { useEagerConnect } from '../hooks/useEagerConnect'
import { useInactiveListener } from '../hooks/useInactiveListener'

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

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    console.log("Wallet running")
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // mount only once or face issues :P
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)
  console.log({ library, active, triedEager, activatingConnector })

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
