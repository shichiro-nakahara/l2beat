import { providers } from 'ethers'

import { readArray } from '../../common/array'
import { ZkSyncUpgradeGatekeeper__factory } from '../../typechain'
import { ContractParameters } from '../../types'
import { addresses } from '../constants'

export async function getUpgradeGatekeeper(
  provider: providers.JsonRpcProvider,
): Promise<ContractParameters> {
  const gatekeeper = ZkSyncUpgradeGatekeeper__factory.connect(
    addresses.upgradeGatekeeper,
    provider,
  )

  return {
    name: 'UpgradeGatekeeper',
    address: gatekeeper.address,
    upgradeability: { type: 'immutable' },
    values: [
      {
        name: 'managedContracts',
        value: await readArray((i) => gatekeeper.managedContracts(i)),
      },
      {
        name: 'master',
        value: await gatekeeper.getMaster(),
      },
      {
        name: 'mainContract',
        value: await gatekeeper.mainContract(),
      },
    ],
  }
}
