import { ProjectId, UnixTime } from '@l2beat/shared'

import { RISK_VIEW } from './common'
import { Bridge } from './types'

export const sollet: Bridge = {
  type: 'bridge',
  id: ProjectId('sollet'),
  display: {
    name: 'Sollet',
    slug: 'sollet',
    warning:
      'Sollet Bridge becomes deprecated on Oct 31, 2022. Users are encouraged to use Wormhole instead.',
    description:
      'Externally Validated bridge to Solana that is now being phased out - users are encouraged to use Wormhole instead.',
    links: {
      websites: ['https://www.sollet.io/'],
      socialMedia: ['https://projectserum.medium.com/'],
      explorers: ['https://solscan.io/'],
      repositories: ['https://github.com/project-serum/spl-token-wallet'],
    },
  },
  config: {
    associatedTokens: ['SRM'],
    escrows: [
      {
        address: '0xeae57ce9cc1984F202e15e038B964bb8bdF7229a',
        sinceTimestamp: new UnixTime(1599794859),
        tokens: ['SRM', 'ETH', 'ALEPH', 'USDT', 'USDC', 'UNI', 'KEEP', 'LINK'],
      },
    ],
  },
  technology: {
    category: 'Token Bridge',
    destination: ['Solana'],
    principleOfOperation: {
      name: 'Principle of Operation',
      isIncomplete: true,
      description:
        'Sollet Bridge becomes deprecated on Oct 31, 2022. Users are encouraged to use Wormhole instead. Bridge contract supports withdrawals of assets locked on Ethereum but requests need to be signed by the contract owner (EOA account).',
      references: [
        {
          text: 'Deprecating Sollet Bridge',
          href: 'https://projectserum.medium.com/deprecating-sollet-bridge-5a092fbd5dda',
        },
      ],
      risks: [
        {
          category: 'Users can be censored if',
          text: "contract owner doesn't sign withdrawal requests.",
          isCritical: true,
        },
        {
          category: 'Funds can be frozen if',
          text: 'contract owner pauses the bridge.',
        },
        {
          category: 'Funds can be stolen if',
          text: 'contract owner withdraws funds belonging to depositors.',
          isCritical: true,
        },
      ],
    },
  },
  riskView: {
    validatedBy: {
      value: 'Third Party',
      description: 'Withdrawals need to be signed by an EOA account.',
      sentiment: 'bad',
    },
    sourceUpgradeability: {
      value: 'No',
      description: 'Source code is not upgradeable',
    },
    destinationToken: {
      ...RISK_VIEW.WRAPPED,
      description:
        RISK_VIEW.WRAPPED.description +
        ' Sollet Bridge and its wrapped asset are deprecated in favor of assets bridged via Wormhole.',
    },
  },
  contracts: {
    addresses: [
      {
        address: '0xeae57ce9cc1984F202e15e038B964bb8bdF7229a',
        name: 'SplTokenSwap',
        description: 'Sollet Bridge Contract.',
      },
    ],
    risks: [],
  },
  permissions: [
    {
      accounts: [
        {
          address: '0x067D382e61c06Cea2815069D9D97fd3ee5df2361',
          type: 'EOA',
        },
      ],
      name: 'Sollet Bridge Owner (EOA)',
      description: 'Can withdraw funds from the bridge',
    },
  ],
}
