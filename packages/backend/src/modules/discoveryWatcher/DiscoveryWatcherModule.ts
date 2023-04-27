import { HttpClient, Logger, MainnetEtherscanClient } from '@l2beat/shared'
import { providers } from 'ethers'

import { Config } from '../../config'
import { Clock } from '../../core/Clock'
import { ConfigReader } from '../../core/discovery/config/ConfigReader'
import { DiscoveryRunner } from '../../core/discovery/DiscoveryRunner'
import { DiscoveryLogger } from '../../core/discovery/utils/DiscoveryLogger'
import { DiscoveryWatcher } from '../../core/DiscoveryWatcher'
import { DiscoveryWatcherRepository } from '../../peripherals/database/discovery/DiscoveryWatcherRepository'
import { Database } from '../../peripherals/database/shared/Database'
import { DiscordClient } from '../../peripherals/discord/DiscordClient'
import { ApplicationModule } from '../ApplicationModule'

export function createDiscoveryWatcherModule(
  config: Config,
  logger: Logger,
  http: HttpClient,
  database: Database,
  clock: Clock,
): ApplicationModule | undefined {
  if (!config.discoveryWatcher) {
    logger.info('Discovery Watcher module disabled')
    return
  }

  const provider = new providers.AlchemyProvider(
    'mainnet',
    config.discoveryWatcher.alchemyApiKey,
  )
  const etherscanClient = new MainnetEtherscanClient(
    http,
    config.discoveryWatcher.etherscanApiKey,
  )

  const discordClient = config.discoveryWatcher.discord
    ? new DiscordClient(
        http,
        config.discoveryWatcher.discord.token,
        config.discoveryWatcher.discord.publicChannelId,
        config.discoveryWatcher.discord.internalChannelId,
      )
    : undefined

  const configReader = new ConfigReader()

  const discoveryWatcherRepository = new DiscoveryWatcherRepository(
    database,
    logger,
  )

  const discoveryLogger = DiscoveryLogger.SILENT

  const discoveryRunner = new DiscoveryRunner(
    provider,
    etherscanClient,
    discoveryLogger,
  )

  const discoveryWatcher = new DiscoveryWatcher(
    provider,
    discoveryRunner,
    discordClient,
    configReader,
    discoveryWatcherRepository,
    clock,
    logger,
    !!config.discoveryWatcher.runOnStart,
  )

  const start = async () => {
    logger = logger.for('DiscoveryWatcherModule')
    logger.info('Starting')

    await discoveryWatcher.start()
  }

  return {
    routers: [],
    start,
  }
}
