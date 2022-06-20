import { LogLevel, UnixTime } from '@l2beat/common'
import { Knex } from 'knex'

import { ProjectInfo, Token } from '../model'
export interface Config {
  name: string
  logger: {
    logLevel: LogLevel
    format: 'pretty' | 'json'
  }
  port: number
  coingeckoApiKey: string | undefined
  alchemyApiKey: string
  etherscanApiKey: string
  databaseConnection: Knex.Config['connection']
  core: {
    minBlockTimestamp: UnixTime
    safeBlockRefreshIntervalMs: number
    safeBlockBlockOffset: bigint
  }
  tokens: Token[]
  projects: ProjectInfo[]
}
