import { BigNumber } from 'ethers'

export const MULTICALL_BATCH_SIZE = 150
export const MULTICALL_BLOCK_NUMBER = 7929876

export const MULTICALL = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
export const UNISWAP_V1_FACTORY = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'
export const UNISWAP_V2_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
export const UNISWAP_V3_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
export const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
export const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
export const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
export const ARBITRUM_INBOX = '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f'
export const ARBITRUM_SEQUENCER_INBOX =
  '0x4c6f947Ae67F572afa4ae0730947DE7C874F95Ef'

export const UNISWAP_V1_SNAPSHOT_BLOCK = 12500000

export const UNISWAP_V2_CODE_HASH =
  '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export const UNISWAP_V3_CODE_HASH =
  '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54'

export const UNISWAP_V1_RELEASE_BLOCK = 6627917
export const UNISWAP_V2_RELEASE_BLOCK = 10000835
export const UNISWAP_V3_RELEASE_BLOCK = 12369621

export const TEN_TO_18 = BigNumber.from('1' + '0'.repeat(18))
