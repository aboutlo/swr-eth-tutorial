import { useEffect } from "react"

export function useWeb3Filter(contract, filter, callback) {
  useEffect(() => {
    contract.once(filter, callback)
  }, [])

  return () => {
    console.log("cleanup!")
    contract.removeAllListeners(filter)
  }
}
