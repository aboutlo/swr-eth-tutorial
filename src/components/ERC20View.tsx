import React, { useEffect, useMemo } from "react"
import { buildContract, ethContractKey, IERC20, memoizedBuildContract } from "../utils"
import useSWR, { keyInterface } from "swr"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import { formatUnits } from "@ethersproject/units"
import { BigNumber } from "@ethersproject/bignumber"
import { ABI, ABIs } from "../abi"
import { useWeb3Filter } from "../hooks/useWeb3Filter"


export const ERC20View = ({ name, address, decimals, symbol }: IERC20) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const key = ethContractKey([
    address,
    "balanceOf",
    account])
  const { data: balance, error, mutate } = useSWR<BigNumber>(key)

  useWeb3Filter(key, [
    (contract) => [
      contract.filters.Transfer(account, null), // fromMe
      async () => {
        mutate(undefined, true)
      },
    ],
    (contract) => [
      contract.filters.Transfer(null, account), //toMe
      async () => await mutate(undefined, true),
    ],
  ])

  // TODO LS export as useFilter.e.g useFilter(contract, [contract.filters.Transfer(account, null), mutate]) The web3fetcher could return the data and the contract built
  /*useEffect(() => {
    const contract = buildContract(address, ABIs.get(ABI.ERC20), library)
    const fromMe = contract.filters.Transfer(account, null)
    contract.once(fromMe, (from, to, amount, event) => {
      console.log("Transfer|sent", { from, to, amount, event })
      // mutate(balance.sub(amount), false) BUG because this is a closure the balance isn't update
      // we could useRef https://stackoverflow.com/a/53641229 but it isn't very elegant
      mutate(undefined, true)
    })

    const toMe = contract.filters.Transfer(null, account)
    contract.once(toMe, (from, to, amount, event) => {
      console.log("Transfer|received", { from, to, amount, event })
      // mutate(balance.add(amount), false) // BUG because this is a closure the balance isn't update
      mutate(undefined, true)
    })
    console.log("rendering", {
      fromMe: contract.listenerCount(fromMe),
      toMe: contract.listenerCount(fromMe),
    })
    return () => {
      console.log("cleanup!")
      contract.removeAllListeners(toMe)
      contract.removeAllListeners(fromMe)
    }
  }, [])*/

  if (error) {
    return <pre>{error}</pre>
  }

  return (
    <div>
      <span>
        {parseFloat(formatUnits(balance, decimals)).toFixed(4)} {symbol}
      </span>
      <a href={`https://rinkeby.etherscan.io/token/${address}`}>{name}</a>
    </div>
  )
}
