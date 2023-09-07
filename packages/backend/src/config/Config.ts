import { Layer2TransactionApi } from '@l2beat/config'
import { LogLevel } from '@l2beat/shared'
import { ChainId, Token, UnixTime } from '@l2beat/shared-pure'
import { Knex } from 'knex'

import { Project } from '../model'

export interface Config {
  readonly name: string
  readonly projects: Project[]
  readonly tokens: Token[]
  readonly logger: LoggerConfig
  readonly logThrottler: LogThrottlerConfig | false
  readonly clock: ClockConfig
  readonly metricsAuth: MetricsAuthConfig | false
  readonly database: DatabaseConfig
  readonly api: ApiConfig
  readonly health: HealthConfig
  readonly tvl: TvlConfig
  readonly activity: ActivityConfig | false
  readonly updateMonitor: UpdateMonitorConfig | false
  readonly statusEnabled: boolean
}

export interface LoggerConfig {
  readonly logLevel: LogLevel
  readonly format: 'pretty' | 'json'
}

export interface LogThrottlerConfig {
  readonly threshold: number
  readonly thresholdTimeInMs: number
  readonly throttleTimeInMs: number
}

export interface ApiConfig {
  readonly port: number
}

export interface DatabaseConfig {
  readonly connection: Knex.Config['connection']
  readonly freshStart: boolean
  readonly connectionPoolSize: {
    min: number
    max: number
  }
}

export interface ClockConfig {
  readonly minBlockTimestamp: UnixTime
  readonly safeTimeOffsetSeconds: number
}

export interface TvlConfig {
  readonly enabled: boolean
  readonly detailedTvlEnabled: boolean
  readonly errorOnUnsyncedDetailedTvl: boolean
  readonly coingeckoApiKey: string | undefined
  readonly ethereum: EthereumTvlConfig | false
  readonly arbitrum: ArbitrumTvlConfig | false
  readonly optimism: OptimismTvlConfig | false
}

export interface EthereumTvlConfig {
  readonly providerUrl: string
  readonly etherscanApiKey: string
  readonly minBlockTimestamp: UnixTime
}

export interface ArbitrumTvlConfig {
  readonly providerUrl: string
  readonly arbiscanApiKey: string
  readonly minBlockTimestamp: UnixTime
}

export interface OptimismTvlConfig {
  readonly minBlockTimestamp: UnixTime
}

export interface HealthConfig {
  readonly releasedAt?: string
  readonly startedAt: string
  readonly commitSha: string
}
export interface ActivityConfig {
  readonly starkexApiKey: string
  readonly starkexCallsPerMinute: number
  readonly skipExplicitExclusion: boolean
  readonly projectsExcludedFromAPI: string[]
  readonly allowedProjectIds?: string[]
  readonly projects: Record<string, Layer2TransactionApi | undefined>
}

export interface MetricsAuthConfig {
  readonly user: string
  readonly pass: string
}

export interface UpdateMonitorConfig {
  readonly runOnStart?: boolean
  readonly chains: UpdateMonitorChainConfig[]
  readonly discord: DiscordConfig | false
}

export interface DiscordConfig {
  readonly token: string
  readonly publicChannelId?: string
  readonly internalChannelId: string
  readonly callsPerMinute: number
}

export interface UpdateMonitorChainConfig {
  chainId: ChainId
  rpcUrl: string
  etherscanApiKey: string
  etherscanUrl: string
  minTimestamp: UnixTime
}
