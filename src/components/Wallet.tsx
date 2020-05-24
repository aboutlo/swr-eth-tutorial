import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { injected } from '../connectors'

export const Wallet = () => {
  const {
    chainId,
    account,
    activate,
    active,
  } = useWeb3React<Web3Provider>()

  const onClick = () => {
    activate(injected)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  )
}
