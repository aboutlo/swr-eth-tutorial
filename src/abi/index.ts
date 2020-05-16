import ERC20ABI from "./ERC20.abi.json"
import ERC20ABIBytes from "./ERC20_bytes32.abi.json"

export enum ABI {
  ERC20,
  ERC20Bytes,
}

export const ABIs = new Map<ABI, object>([
  [ABI.ERC20, ERC20ABI],
  [ABI.ERC20Bytes, ERC20ABIBytes],
])


