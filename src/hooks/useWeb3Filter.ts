import { useEffect } from "react"
import { buildContract } from "../utils"
import { ABI, ABIs } from "../abi"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import { keyInterface } from "swr"
import { Contract, EventFilter } from "@ethersproject/contracts"

type keyValue = (contract: Contract) => [EventFilter, () => Promise<any>]
export type IFilter = keyValue[]

export function useWeb3Filter(key: keyInterface, filters: IFilter) {
  const { library } = useWeb3React<Web3Provider>()
  const [abi, address, method, ...params] = key
  const contract = buildContract(address, ABIs.get(abi), library)
  useEffect(() => {
    filters.forEach((filterFactory) => {
      const [filter, callback] = filterFactory(contract)
      contract.once(filter, callback)
    })
  }, [])

  return () => {
    console.log("cleanup!")
    filters.forEach((factory) => {
      const [filter] = factory(contract)
      contract.removeAllListeners(filter)
    })
  }
}
