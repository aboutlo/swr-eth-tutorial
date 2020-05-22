import React from "react"
import useSWR from "swr"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import { formatEther } from "@ethersproject/units"
import { BigNumber } from "@ethersproject/bignumber"

export const EtherView = () => {
  const { account, library } = useWeb3React<Web3Provider>()

  const {
    data: ethBalance,
    isValidating,
    error: balanceError,
    mutate: updateBalance,
  } = useSWR<any>(["getBalance", account, "latest"])

  const {
    data: blockNumber,
    isValidating: blockNumberIsValidating,
    error: blockNumberError,
    mutate: updateBlockNumber,
  } = useSWR(
    [
      "getBlockNumber",
    ]
  )

  // https://docs.ethers.io/ethers.js/html/api-providers.html#event-types
  library
    .once("block", (blockNumber) => {
      console.log({ blockNumber })
      updateBlockNumber(blockNumber, false)
    })
    .once(account, (balance) => {
      updateBalance(balance, false)
    })

  /*if (!ethBalance || !blockNumber) {
    return <pre>...</pre>
  }*/

  if (balanceError || blockNumberError) {
    return <pre>{JSON.stringify(balanceError || blockNumberError)}</pre>
  }

  return (
    <>
      <div>
        BlockNumber:{BigNumber.from(blockNumber).toNumber().toLocaleString()}
      </div>
      <div>${parseFloat(formatEther(ethBalance)).toPrecision(4)} Ξ Ether</div>
    </>
  )
}
