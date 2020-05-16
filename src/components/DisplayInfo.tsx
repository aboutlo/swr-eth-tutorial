import React, { Suspense } from "react"
import { TOKENS_BY_NETWORK } from "../utils"
import { ERC20View } from "./ERC20View"
import { EtherView } from "./EtherView"

export const DisplayInfo = ({ chainId }) => {
  return (
    <>
      <Suspense fallback={<pre>Ether...</pre>}>
        <EtherView />
      </Suspense>
      <hr />
      <Suspense fallback={<pre>Tokens...</pre>}>
        {TOKENS_BY_NETWORK[chainId].map((token) => (
          <ERC20View key={token.address} {...token} />
        ))}
      </Suspense>
    </>
  )
}
