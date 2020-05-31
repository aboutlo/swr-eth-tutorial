import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { Networks, shorter, TOKENS_BY_NETWORK } from '../utils'
import fetcher from 'swr-eth'
import { SWRConfig } from 'swr'
import ERC20ABI from '../abi/ERC20.abi.json'
import { EthBalance } from './EthBalance'
import { TokenList } from './TokenList'
import { InjectedConnector } from '@web3-react/injected-connector'
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
  const {
    chainId,
    account,
    library,
    activate,
    active,
    connector,
  } = useWeb3React<Web3Provider>()

  // [
  //   [ 0x00001, JSONABI ]
  // ]
  const ABIs = useMemo(() => {
    return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(
      ({ address, abi }) => [address, abi]
    )
  }, [chainId])

  const onClick = () => {
    activate(injectedConnector)
  }

  console.log({ABIs})
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    console.log('Wallet running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // mount only once or face issues :P
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

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
        <SWRConfig value={{ fetcher: fetcher(library, new Map(ABIs)) }}>
          <EthBalance />
          <TokenList chainId={chainId} />
        </SWRConfig>
      )}
    </div>
  )
}
