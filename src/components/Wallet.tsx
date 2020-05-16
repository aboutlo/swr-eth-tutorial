import React, { Suspense } from "react"
import { SWRConfig } from "swr"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"

import { useEagerConnect } from "../hooks/useEagerConnect"
import { useInactiveListener } from "../hooks/useInactiveListener"
import { DisplayInfo } from "./DisplayInfo"
import { web3Fetcher } from "../utils"
import { injected } from "../connectors"
import { ABIs } from "../abi"

export const Wallet = () => {
  const context = useWeb3React<Web3Provider>()
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context

  const onClick = () => {
    activate(injected)
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
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
      {library && (
        <SWRConfig
          value={{
            fetcher: web3Fetcher(library, ABIs),
            suspense: true,
            focusThrottleInterval: 5000,
          }}
        >
          <DisplayInfo chainId={chainId} />
        </SWRConfig>
      )}
    </div>
  )
}
