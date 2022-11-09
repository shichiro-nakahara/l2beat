import { VerificationStatus } from '@l2beat/types'
import cx from 'classnames'
import React from 'react'

import { BulletIcon } from '../icons/symbols/BulletIcon'
import { OutLink } from '../OutLink'
import { UnverifiedContractsWarning } from '../table/UnverifiedContractsWarning'
import { Callout } from './Callout'
import { EtherscanLink } from './EtherscanLink'

export interface TechnologyContract {
  name: string
  address?: string
  description?: string
  links: {
    name: string
    href: string
    address: string
  }[]
}

export interface ContractEntryProps {
  contract: TechnologyContract
  verificationStatus: VerificationStatus
}

export function ContractEntry({
  contract,
  verificationStatus,
}: ContractEntryProps) {
  const areLinksUnverified = contract.links
    .map((c) => verificationStatus.contracts[c.address])
    .some((c) => c === false)

  const isVerified = contract.address
    ? verificationStatus.contracts[contract.address]
    : undefined

  const color = isVerified === false || areLinksUnverified ? 'red' : undefined
  const icon =
    isVerified === false || areLinksUnverified ? (
      <UnverifiedContractsWarning
        className="mt-[3px]"
        tooltip="Source code is not verified"
      />
    ) : (
      <BulletIcon className="h-6 md:h-[27px]" />
    )

  return (
    <Callout
      className={cx(color === 'red' ? 'p-4' : 'px-4')}
      color={color}
      icon={icon}
      body={
        <div className="flex gap-2 flex-wrap">
          <strong>{contract.name}</strong>{' '}
          {contract.address && (
            <EtherscanLink
              address={contract.address}
              className={cx(
                isVerified === false ? 'text-red-700 dark:text-red-300' : '',
              )}
            />
          )}
          {contract.links.map((x, i) => (
            <OutLink
              key={i}
              className={cx(
                'text-link underline',
                verificationStatus.contracts[x.address] === false
                  ? 'text-red-700 dark:text-red-300'
                  : '',
              )}
              href={x.href}
            >
              {x.name}
            </OutLink>
          ))}
          {contract.description && (
            <div>
              <p className="text-gray-860 dark:text-gray-400">
                {contract.description}
              </p>
            </div>
          )}
        </div>
      }
    />
  )
}
