import { Bytes, EthereumAddress } from '@l2beat/types'

import { DiscoveryProvider } from '../../provider/DiscoveryProvider'
import { bytes32ToAddress } from '../../utils/address'
import { ProxyDetection } from '../types'

// keccak256('org.zeppelinos.proxy.implementation')
const IMPLEMENTATION_SLOT = Bytes.fromHex(
  '0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3',
)

async function getImplementation(
  provider: DiscoveryProvider,
  address: EthereumAddress,
) {
  return bytes32ToAddress(
    await provider.getStorage(address, IMPLEMENTATION_SLOT),
  )
}

// keccak256("org.zeppelinos.proxy.owner")
const OWNER_SLOT = Bytes.fromHex(
  '0x337c729c04082e3bdd94ba7d2b5a8a642f3a138702366a91707825373a2029ba',
)

async function getOwner(provider: DiscoveryProvider, address: EthereumAddress) {
  return bytes32ToAddress(await provider.getStorage(address, OWNER_SLOT))
}

// keccak256("org.zeppelinos.proxy.admin")
const ADMIN_SLOT = Bytes.fromHex(
  '0x10d6a54a4754c8869d6886b5f5d7fbfa5b4522237ea5c60d11bc4e7a1ff9390b',
)

async function getAdmin(provider: DiscoveryProvider, address: EthereumAddress) {
  return bytes32ToAddress(await provider.getStorage(address, ADMIN_SLOT))
}

export async function detectZeppelinOSProxy(
  provider: DiscoveryProvider,
  address: EthereumAddress,
): Promise<ProxyDetection | undefined> {
  const implementation = await getImplementation(provider, address)
  if (implementation === EthereumAddress.ZERO) {
    return
  }
  const [owner, admin] = await Promise.all([
    getOwner(provider, address),
    getAdmin(provider, address),
  ])
  return {
    implementations: [implementation],
    relatives: [owner, admin].filter((x) => x !== EthereumAddress.ZERO),
    upgradeability: {
      type: 'ZeppelinOS proxy',
      implementation,
      owner: owner !== EthereumAddress.ZERO ? owner : undefined,
      admin: admin !== EthereumAddress.ZERO ? admin : undefined,
    },
  }
}
