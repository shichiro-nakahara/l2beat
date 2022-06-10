import {
  CONTRACTS,
  DATA_AVAILABILITY,
  EXITS,
  FORCE_TRANSACTIONS,
  NEW_CRYPTOGRAPHY,
  OPERATOR,
  RISK_VIEW,
  STATE_CORRECTNESS,
} from './common'
import { Project } from './types'

export const zksync: Project = {
  name: 'zkSync',
  slug: 'zksync',
  bridges: [
    {
      address: '0xaBEA9132b05A70803a4E85094fD0e1800777fBEF',
      sinceBlock: 10269890,
      tokens: '*',
    },
  ],
  details: {
    description:
      'zkSync is a user-centric zk rollup platform from Matter Labs. It is a scaling solution for Ethereum, already live on Ethereum mainnet. It supports payments, token swaps and NFT minting.',
    purpose: 'Tokens, NFTs',
    links: {
      websites: ['https://zksync.io/'],
      apps: ['https://wallet.zksync.io/'],
      documentation: ['https://zksync.io/dev/'],
      explorers: ['https://zkscan.io/'],
      repositories: ['https://github.com/matter-labs/zksync'],
      socialMedia: [
        'https://medium.com/matter-labs',
        'https://discord.gg/px2aR7w',
        'https://t.me/zksync',
        'https://twitter.com/zksync',
      ],
    },
    riskView: {
      stateValidation: RISK_VIEW.STATE_ZKP_SN,
      dataAvailability: RISK_VIEW.DATA_ON_CHAIN,
      upgradeability: {
        value: '21d or no delay',
        description:
          'There is a 21 days delay unless it is overriden by the 9/15 Security Council multisig.',
        sentiment: 'warning',
      },
      sequencerFailure: RISK_VIEW.SEQUENCER_FORCE_EXIT_L1,
      validatorFailure: RISK_VIEW.VALIDATOR_ESCAPE_ZKP,
    },
    technology: {
      category: {
        name: 'ZK Rollup',
      },
      stateCorrectness: {
        ...STATE_CORRECTNESS.VALIDITY_PROOFS,
        references: [
          {
            text: 'Validity proofs - zkSync FAQ',
            href: 'https://zksync.io/faq/security.html#validity-proofs',
          },
        ],
      },
      newCryptography: {
        ...NEW_CRYPTOGRAPHY.ZK_SNARKS,
        references: [
          {
            text: 'Cryptography used - zkSync FAQ',
            href: 'https://zksync.io/faq/security.html#cryptography-used',
          },
        ],
      },
      dataAvailability: {
        ...DATA_AVAILABILITY.ON_CHAIN,
        references: [
          {
            text: 'Overview - zkSync documentation',
            href: 'https://zksync.io/dev/#overview',
          },
        ],
      },
      operator: {
        ...OPERATOR.CENTRALIZED_OPERATOR,
        references: [
          {
            text: 'How decentralized is zkSync - zkSync FAQ',
            href: 'https://zksync.io/faq/decentralization.html#how-decentralized-is-zksync',
          },
        ],
      },
      forceTransactions: {
        ...FORCE_TRANSACTIONS.WITHDRAW_OR_HALT,
        references: [
          {
            text: 'Priority queue - zkSync FAQ',
            href: 'https://zksync.io/faq/security.html#priority-queue',
          },
        ],
      },
      exitMechanisms: [
        {
          ...EXITS.REGULAR('zk', 'no proof'),
          references: [
            {
              text: 'Withdrawing funds - zkSync documentation',
              href: 'https://zksync.io/dev/payments/basic.html#flow',
            },
          ],
        },
        {
          ...EXITS.FORCED,
          references: [
            {
              text: 'Withdrawing funds - zkSync documentation',
              href: 'https://zksync.io/dev/payments/basic.html#flow',
            },
          ],
        },
        {
          ...EXITS.EMERGENCY('Exodus Mode', 'zero knowledge proof'),
          references: [
            {
              text: 'Withdrawing funds - zkSync documentation',
              href: 'https://zksync.io/dev/payments/basic.html#flow',
            },
            {
              text: 'README.md - zkSync Exit Tool',
              href: 'https://github.com/matter-labs/zksync/tree/master/infrastructure/exit-tool',
            },
          ],
        },
      ],
      contracts: {
        addresses: [
          {
            address: '0xaBEA9132b05A70803a4E85094fD0e1800777fBEF',
            name: 'ZkSync',
            description:
              'The main Rollup contract. Operator commits blocks, provides zkProof which is validated by the Verifier contract and process withdrawals (executes blocks). Users deposit ETH and ERC20 tokens. This contract defines the upgrade delay in the UPGRADE_NOTICE_PERIOD constant is currently set to 21 days. 9/15 Security Council MSig can override the delay period and execute an emergency immediate upgrade.',
            upgradeability: {
              type: 'EIP1967',
              admin: '0x38A43F4330f24fe920F943409709fc9A6084C939',
              implementation: '0x204c6BADaD00Ef326dE0921A940D8267060d1033',
            },
          },
          {
            address: '0x5290E9582B4FB706EaDf87BB1c129e897e04d06D',
            name: 'Verifier',
            description: 'Implements zkProof verification logic.',
            upgradeability: {
              type: 'EIP1967',
              admin: '0x38A43F4330f24fe920F943409709fc9A6084C939',
              implementation: '0xEF974376054490C8d87b8438b4cEC00391ac05b9',
            },
          },
          {
            address: '0x38A43F4330f24fe920F943409709fc9A6084C939',
            name: 'UpgradeGatekeeper',
            description:
              'This is the contract that implements the upgrade mechanism for Governance, Verifier and ZkSync. It relies on the ZkSync contract to enforce upgrade delays.',
          },
          {
            address: '0x34460C0EB5074C29A9F6FE13b8e7E23A0D08aF01',
            name: 'Governance',
            description:
              'Keeps a list of block producers, NFT factories and whitelisted tokens.',
            upgradeability: {
              type: 'EIP1967',
              admin: '0x38A43F4330f24fe920F943409709fc9A6084C939',
              implementation: '0x9a97008ccCbDEc3413F9304602427e66895996A0',
            },
          },
        ],
        risks: [
          CONTRACTS.UPGRADE_WITH_DELAY_RISK(
            '21 days or 0 if overriden by 9/15 MSig'
          ),
        ],
      },
    },
    news: [
      {
        date: '2022-01-14',
        name: 'On Managing Secure Upgradability',
        link: 'https://blog.matter-labs.io/upgradability3-934db4433b0c',
      },
      {
        date: '2021-05-24',
        name: 'zkSync 1.x: Swaps, NFTs, event system, and permissionless token listing',
        link: 'https://medium.com/matter-labs/zksync-1-x-swaps-nfts-event-system-and-permissionless-token-listing-e126fcc04d61',
      },
      {
        date: '2021-05-21',
        name: 'Keeping Funds Safe: a 3-Factor Approach to Security in zkSync 2.0',
        link: 'https://medium.com/matter-labs/keeping-funds-safe-a-3-factor-approach-to-security-in-zksync-2-0-a70b0f53f360',
      },
    ],
  },
}
