import React, { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import useSWR, { responseInterface } from "swr"

export function useEthersSWR(params): responseInterface<any, any> {
  const { chainId } = useWeb3React()
  const [swr, setSWR] = useState<responseInterface<any, any>>({
    isValidating: false,
    revalidate: () => Promise.resolve(false),
    mutate: () => Promise.resolve(),
  })
  useEffect(() => {
    const dataSet = useSWR([chainId, ...params])
    setSWR(dataSet)
  }, [params, chainId])
  return swr
}
