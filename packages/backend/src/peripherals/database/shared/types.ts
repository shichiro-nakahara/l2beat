import { EventGranularity } from '../EventRepository'

export {}

declare module 'knex/types/tables' {
  interface BlockNumberRow {
    unix_timestamp: string
    block_number: number
  }

  interface PriceRow {
    asset_id: string
    price_usd: number
    unix_timestamp: string
  }

  interface BalanceRow {
    unix_timestamp: string
    holder_address: string
    asset_id: string
    balance: string
  }

  interface ReportRow {
    unix_timestamp: string
    project_id: string
    asset_id: string
    balance: string
    balance_usd: string
    balance_eth: string
  }

  interface AggregateReportRow {
    unix_timestamp: string
    project_id: string
    tvl_usd: string
    tvl_eth: string
    is_daily: boolean
    is_six_hourly: boolean
  }

  interface ReportStatusRow {
    config_hash: string
    unix_timestamp: string
  }

  interface BalanceStatusRow {
    config_hash: string
    unix_timestamp: string
  }

  interface EventRow {
    unix_timestamp: string
    event_name: string
    project_id: string
    count: number
    time_span: EventGranularity
  }

  interface TransactionCountRow {
    unix_timestamp: Date
    project_id: string
    block_number: number
    count: number
  }

  interface Tables {
    block_numbers: BlockNumberRow
    coingecko_prices: PriceRow
    asset_balances: BalanceRow
    balance_status: BalanceStatusRow
    reports: ReportRow
    aggregate_reports: AggregateReportRow
    report_status: ReportStatusRow
    events: EventRow
    transaction_count: TransactionCountRow
  }
}
