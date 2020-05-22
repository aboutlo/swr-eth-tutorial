import { Contract } from "@ethersproject/contracts"
import { ABI } from "../abi/index"
import { Web3Provider } from "@ethersproject/providers"
import memoize from "fast-memoize"
import { keyInterface } from "swr"

export function buildContract(address:string, abi:any, library:Web3Provider) {
  return new Contract(address, abi, library.getSigner())
}

export const memoizedBuildContract = memoize(buildContract)

export const ethMethodKey = (args): keyInterface => {
  return args
}

export const ethContractKey = (args): keyInterface => {
  return [ABI.ERC20, ...args]
}

export const web3Fetcher = (
  library: Web3Provider,
  ABIs: Map<ABI, any>
) => async (...args) => {
  // debugger
  const [abi] = args
  const isContract = ABIs.get(abi) !== undefined
  if (isContract) {
    const [_, address, method, ...params] = args
    // extract as buildContract memoized
    const contract = buildContract(
      address,
      ABIs.get(abi),
      library
    )
    console.log({ contract: address, method, params })
    return contract[method](...params)
  }
  const [method, ...params] = args
  console.log({ method, params })
  return library[method](...params)
}

export const Networks = {
  MainNet: 1,
  Rinkeby: 4,
  Ropsten: 3,
  Kovan: 42,
}

export interface IERC20 {
  symbol: string
  address: string
  decimals: number
  name: string
}

export const TOKENS_BY_NETWORK: {
  [key: number]: IERC20[]
} = {
  [Networks.MainNet]: [
    {
      address: "0x737F98AC8cA59f2C68aD658E3C3d8C8963E40a4c",
      symbol: "AMN",
      name: "Amon",
      decimals: 18,
    },
    {
      address: "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
      symbol: "AMPL",
      name: "Ampleforth",
      decimals: 9,
    },
    {
      address: "0x960b236A07cf122663c4303350609A66A7B288C0",
      name: "Aragon Network",
      symbol: "ANT",
      decimals: 18,
    },

    {
      address: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
      name: "Basic Attention",
      symbol: "BAT",
      decimals: 18,
    },

    {
      address: "0x107c4504cd79C5d2696Ea0030a8dD4e92601B82e",
      name: "Bloom",
      symbol: "BLT",
      decimals: 18,
    },

    {
      address: "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C",
      name: "Bancor Network",
      symbol: "BNT",
      decimals: 18,
    },

    {
      address: "0x26E75307Fc0C021472fEb8F727839531F112f317",
      name: "Crypto20",
      symbol: "C20",
      decimals: 18,
    },

    {
      address: "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
      name: "Compound Dai",
      symbol: "cSAI",
      decimals: 8,
    },

    {
      address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
      name: "Compound Dai",
      symbol: "cDAI",
      decimals: 8,
    },

    {
      address: "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215",
      name: "Chai",
      symbol: "CHAI",
      decimals: 18,
    },

    {
      address: "0x41e5560054824eA6B0732E656E3Ad64E20e94E45",
      name: "Civic",
      symbol: "CVC",
      decimals: 8,
    },

    {
      address: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
      name: "Dai Stablecoin v1.0 (SAI)",
      symbol: "SAI",
      decimals: 18,
    },

    {
      address: "0x0Cf0Ee63788A0849fE5297F3407f701E122cC023",
      name: "Streamr DATAcoin",
      symbol: "DATA",
      decimals: 18,
    },

    {
      address: "0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A",
      name: "DigixDAO",
      symbol: "DGD",
      decimals: 9,
    },

    {
      address: "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF",
      name: "Digix Gold",
      symbol: "DGX",
      decimals: 9,
    },

    {
      address: "0xc719d010B63E5bbF2C0551872CD5316ED26AcD83",
      name: "Decentralized Insurance Protocol",
      symbol: "DIP",
      decimals: 18,
    },

    {
      address: "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c",
      name: "Enjin Coin",
      symbol: "ENJ",
      decimals: 18,
    },

    {
      address: "0x4946Fcea7C692606e8908002e55A582af44AC121",
      name: "FOAM",
      symbol: "FOAM",
      decimals: 18,
    },

    {
      address: "0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b",
      name: "FunFair",
      symbol: "FUN",
      decimals: 8,
    },

    {
      address: "0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf",
      name: "DAOstack",
      symbol: "GEN",
      decimals: 18,
    },

    {
      address: "0x6810e776880C02933D47DB1b9fc05908e5386b96",
      name: "Gnosis",
      symbol: "GNO",
      decimals: 18,
    },

    {
      address: "0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD",
      name: "GRID",
      symbol: "GRID",
      decimals: 12,
    },

    {
      address: "0x14094949152EDDBFcd073717200DA82fEd8dC960",
      name: "bZx DAI iToken ",
      symbol: "iDAI",
      decimals: 18,
    },

    {
      address: "0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69",
      name: "IoTeX Network",
      symbol: "IOTX",
      decimals: 18,
    },

    {
      address: "0x818Fc6C2Ec5986bc6E2CBf00939d90556aB12ce5",
      name: "Kin",
      symbol: "KIN",
      decimals: 18,
    },

    {
      address: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
      name: "Kyber Network Crystal",
      symbol: "KNC",
      decimals: 18,
    },

    {
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      name: "ChainLink",
      symbol: "LINK",
      decimals: 18,
    },

    {
      address: "0x6c6EE5e31d828De241282B9606C8e98Ea48526E2",
      name: "HoloToken",
      symbol: "HOT",
      decimals: 18,
    },

    {
      address: "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
      name: "LoopringCoin V2",
      symbol: "LRC",
      decimals: 18,
    },

    {
      address: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
      name: "EthLend",
      symbol: "LEND",
      decimals: 18,
    },

    {
      address: "0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0",
      name: "LoomToken",
      symbol: "LOOM",
      decimals: 18,
    },

    {
      address: "0x58b6A8A3302369DAEc383334672404Ee733aB239",
      name: "Livepeer",
      symbol: "LPT",
      decimals: 18,
    },

    {
      address: "0xD29F0b5b3F50b07Fe9a9511F7d86F4f4bAc3f8c4",
      name: "Liquidity.Network",
      symbol: "LQD",
      decimals: 18,
    },

    {
      address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
      name: "Decentraland MANA",
      symbol: "MANA",
      decimals: 18,
    },

    {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },

    {
      address: "0x8888889213DD4dA823EbDD1e235b09590633C150",
      name: "Marblecoin",
      symbol: "MBC",
      decimals: 18,
    },

    {
      address: "0x80f222a749a2e18Eb7f676D371F19ad7EFEEe3b7",
      name: "Magnolia",
      symbol: "MGN",
      decimals: 18,
    },

    {
      address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
      name: "Maker",
      symbol: "MKR",
      decimals: 18,
    },

    {
      address: "0xec67005c4E498Ec7f55E092bd1d35cbC47C91892",
      name: "Melon",
      symbol: "MLN",
      decimals: 18,
    },

    {
      address: "0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e",
      name: "Modum",
      symbol: "MOD",
      decimals: 0,
    },

    {
      address: "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
      name: "Nexo",
      symbol: "NEXO",
      decimals: 18,
    },

    {
      address: "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
      name: "Numeraire",
      symbol: "NMR",
      decimals: 18,
    },

    {
      address: "0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44",
      name: "Panvala pan",
      symbol: "PAN",
      decimals: 18,
    },

    {
      address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
      name: "PAX",
      symbol: "PAX",
      decimals: 18,
    },

    {
      address: "0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d",
      name: "Pinakion",
      symbol: "PNK",
      decimals: 18,
    },

    {
      address: "0x6758B7d441a9739b98552B373703d8d3d14f9e62",
      name: "POA ERC20 on Foundation",
      symbol: "POA20",
      decimals: 18,
    },

    {
      address: "0x687BfC3E73f6af55F0CccA8450114D107E781a0e",
      name: "QChi",
      symbol: "QCH",
      decimals: 18,
    },

    {
      address: "0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d",
      name: "Quantstamp",
      symbol: "QSP",
      decimals: 18,
    },

    {
      address: "0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6",
      name: "Ripio Credit Network",
      symbol: "RCN",
      decimals: 18,
    },

    {
      address: "0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6",
      name: "Raiden",
      symbol: "RDN",
      decimals: 18,
    },

    {
      address: "0x408e41876cCCDC0F92210600ef50372656052a38",
      name: "Republic",
      symbol: "REN",
      decimals: 18,
    },

    {
      address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
      name: "Reputation",
      symbol: "REP",
      decimals: 18,
    },

    {
      address: "0x168296bb09e24A88805CB9c33356536B980D3fC5",
      name: "RHOC",
      symbol: "RHOC",
      decimals: 8,
    },

    {
      address: "0x9469D013805bFfB7D3DEBe5E7839237e535ec483",
      name: "Darwinia Network Native",
      symbol: "RING",
      decimals: 18,
    },

    {
      address: "0x607F4C5BB672230e8672085532f7e901544a7375",
      name: "iEx.ec Network",
      symbol: "RLC",
      decimals: 9,
    },

    {
      address: "0xB4EFd85c19999D84251304bDA99E90B92300Bd93",
      name: "Rocket Pool",
      symbol: "RPL",
      decimals: 18,
    },

    {
      address: "0x4156D3342D5c385a87D264F90653733592000581",
      name: "Salt",
      symbol: "SALT",
      decimals: 8,
    },

    {
      address: "0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098",
      name: "SANtiment network token",
      symbol: "SAN",
      decimals: 18,
    },

    {
      address: "0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb",
      name: "Synth sETH",
      symbol: "sETH",
      decimals: 18,
    },

    {
      address: "0x3A9FfF453d50D4Ac52A6890647b823379ba36B9E",
      name: "Shuffle.Monster V3",
      symbol: "SHUF",
      decimals: 18,
    },

    {
      address: "0x744d70FDBE2Ba4CF95131626614a1763DF805B9E",
      name: "Status Network",
      symbol: "SNT",
      decimals: 18,
    },

    {
      address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
      name: "Synthetix Network",
      symbol: "SNX",
      decimals: 18,
    },

    {
      address: "0x23B608675a2B2fB1890d3ABBd85c5775c51691d5",
      name: "Unisocks Edition 0",
      symbol: "SOCKS",
      decimals: 18,
    },

    {
      address: "0x42d6622deCe394b54999Fbd73D108123806f6a18",
      name: "SPANK",
      symbol: "SPANK",
      decimals: 18,
    },

    {
      address: "0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC",
      name: "StorjToken",
      symbol: "STORJ",
      decimals: 8,
    },

    {
      address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
      name: "Synth sUSD",
      symbol: "sUSD",
      decimals: 18,
    },

    {
      address: "0x00006100F7090010005F1bd7aE6122c3C2CF0090",
      name: "TrueAUD",
      symbol: "TAUD",
      decimals: 18,
    },

    {
      address: "0x00000100F2A2bd000715001920eB70D229700085",
      name: "TrueCAD",
      symbol: "TCAD",
      decimals: 18,
    },

    {
      address: "0x00000000441378008EA67F4284A57932B1c000a5",
      name: "TrueGBP",
      symbol: "TGBP",
      decimals: 18,
    },

    {
      address: "0x0000852600CEB001E08e00bC008be620d60031F2",
      name: "TrueHKD",
      symbol: "THKD",
      decimals: 18,
    },

    {
      address: "0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a",
      name: "Monolith TKN",
      symbol: "TKN",
      decimals: 8,
    },

    {
      address: "0x2C537E5624e4af88A7ae4060C022609376C8D0EB",
      name: "BiLira",
      symbol: "TRYB",
      decimals: 6,
    },

    {
      address: "0x0000000000085d4780B73119b644AE5ecd22b376",
      name: "TrueUSD",
      symbol: "TUSD",
      decimals: 18,
    },

    {
      address: "0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14",
      name: "Uniswap V1",
      symbol: "UNI-V1:SAI",
      decimals: 18,
    },

    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "USD//C",
      symbol: "USDC",
      decimals: 6,
    },

    {
      address: "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374",
      name: "Veritaseum",
      symbol: "VERI",
      decimals: 18,
    },

    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      name: "Wrapped BTC",
      symbol: "WBTC",
      decimals: 8,
    },

    {
      address: "0x09fE5f0236F0Ea5D930197DCE254d77B04128075",
      name: "Wrapped CryptoKitties",
      symbol: "WCK",
      decimals: 18,
    },

    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      name: "Wrapped Ether",
      symbol: "WETH",
      decimals: 18,
    },

    {
      address: "0xB4272071eCAdd69d933AdcD19cA99fe80664fc08",
      name: "CryptoFranc",
      symbol: "XCHF",
      decimals: 18,
    },

    {
      address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
      name: "0x Protocol",
      symbol: "ZRX",
      decimals: 18,
    },

    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
    },
  ],
  [Networks.Rinkeby]: [
    {
      address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
    },
    {
      address: "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85",
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
    },
  ],
}
