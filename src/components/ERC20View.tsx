import React, { useEffect, useMemo } from "react"
import { buildContract, IERC20, memoizedBuildContract } from "../utils"
import ERC20ABI from "../abi/ERC20.abi.json"
import useSWR, { keyInterface } from "swr"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import { formatUnits } from "@ethersproject/units"
import { BigNumber } from "@ethersproject/bignumber"
import { ABI, ABIs } from "../abi"
import { useWeb3Filter } from "../hooks/useWeb3Filter"
import { Contract } from "@ethersproject/contracts"

const balanceOfKey = (address:string, account:string): keyInterface => {
  return [ABI.ERC20, address, "balanceOf", account]
}
export const ERC20View = ({ name, address, decimals, symbol }: IERC20) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const { data: balance, isValidating, error, mutate } = useSWR<BigNumber>(
    // [ABI.ERC20, address, "balanceOf", account]
    balanceOfKey(address, account)
  )
  console.log({balance})
  // useWeb3Filter(
  //   balanceOfKey(address, account),
  //   "Transfer",
  //   (from, to, amount, event) => {
  //     console.log("Transfer|sent", { from, to, amount, event })
  //     mutate(balance.sub(amount), false)
  //     // mutate(undefined, true)
  //   }
  // )

  // TODO LS export as useFilter.e.g useFilter(contract, [contract.filters.Transfer(account, null), mutate]) The web3fetcher could return the data and the contract built
  useEffect(() => {
    const contract = buildContract(address, ABIs.get(ABI.ERC20), library)
    const fromMe = contract.filters.Transfer(account, null)
    console.log()
    contract.once(fromMe, (from, to, amount, event) => {
      console.log("Transfer|sent", { from, to, amount, event })
      mutate(balance.sub(amount), false)
      // mutate(undefined, true)
    })

    const toMe = contract.filters.Transfer(null, account)
    contract.once(toMe, (from, to, amount, event) => {
      console.log("Transfer|received", { from, to, amount, event })
      mutate(balance.add(amount), false)
      // mutate(undefined, true)
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
  }, [])

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
