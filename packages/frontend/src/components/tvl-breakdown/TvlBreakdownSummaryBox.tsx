import classNames from 'classnames'
import React from 'react'

import { TvlBreakdownViewProps } from '../../pages/scaling-projects-tvl-breakdown/props/getTvlBreakdownView'
import { PercentChange } from '../PercentChange'

export function TvlBreakdownSummaryBox(
  props: TvlBreakdownViewProps['tvlBreakdownSummary'],
) {
  return (
    <div className="flex flex-col justify-between gap-2 bg-purple-300 p-6 dark:bg-purple-700 md:flex-row md:rounded-lg md:border md:border-pink-200 md:dark:border-pink-900">
      <StatsItem
        title="Total TVL"
        mobileTitle="Total Value Locked"
        value={props.tvl.value}
        change={props.tvl.change}
        big
      />
      <StatsItem
        title="Canonically Bridged"
        mobileTitle="Canonically Bridged Value"
        value={props.canonical.value}
        change={props.canonical.change}
      />
      <StatsItem
        title="Externally Bridged"
        mobileTitle="Externally Bridged Value"
        value={props.external.value}
        change={props.external.change}
      />
      <StatsItem
        title="Natively Minted"
        mobileTitle="Natively Minted Tokens"
        value={props.native.value}
        change={props.native.change}
      />
    </div>
  )
}

interface StatsItemProps {
  title: string
  mobileTitle: string
  value: string
  change: string
  big?: boolean
}

function StatsItem(props: StatsItemProps) {
  return (
    <div className="flex items-center justify-between md:flex-col md:items-start">
      <span className="hidden text-xs font-medium text-gray-600 md:inline">
        {props.title}
      </span>
      <span
        className={classNames(
          'font-medium  md:hidden',
          props.big
            ? 'text-lg text-black dark:text-white'
            : 'text-xs text-gray-600',
        )}
      >
        {props.mobileTitle}
      </span>
      <div className="flex items-center gap-1">
        <span
          className={classNames(
            'font-bold text-black dark:text-white md:text-lg',
            props.big ? 'text-lg' : 'text-base',
          )}
        >
          {props.value}
        </span>
        <div className="ml-1 text-xs font-semibold md:text-base">
          <PercentChange value={props.change} />
        </div>
      </div>
    </div>
  )
}
