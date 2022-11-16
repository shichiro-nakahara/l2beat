import { Logger } from '@l2beat/common'
import KnexConstructor, { Knex } from 'knex'
import path from 'path'

import { configureUtc } from './configureUtc'
import { PolyglotMigrationSource } from './PolyglotMigrationSource'

export class Database {
  private readonly knex: Knex
  private migrated = false
  private version: string | null = null
  private onMigrationsComplete: () => void = () => {}
  private readonly migrationsComplete = new Promise<void>((resolve) => {
    this.onMigrationsComplete = resolve
  })

  constructor(
    connection: Knex.Config['connection'],
    name: string,
    private readonly logger: Logger,
  ) {
    configureUtc()

    const connectionWithName =
      typeof connection === 'object'
        ? { ...connection, application_name: name }
        : connection

    this.logger = this.logger.for(this)
    this.knex = KnexConstructor({
      client: 'pg',
      connection: connectionWithName,
      migrations: {
        migrationSource: new PolyglotMigrationSource(
          path.join(__dirname, '..', 'migrations'),
        ),
      },
    })
  }

  async getKnex(trx?: Knex.Transaction) {
    if (!this.migrated) {
      await this.migrationsComplete
    }
    return trx ?? this.knex
  }

  getStatus() {
    return { migrated: this.migrated, version: this.version }
  }

  skipMigrations() {
    this.onMigrationsComplete()
    this.migrated = true
  }

  async migrateToLatest() {
    await this.knex.migrate.latest()
    const version = await this.knex.migrate.currentVersion()
    this.version = version
    this.onMigrationsComplete()
    this.migrated = true
    this.logger.info('Migrations completed', { version })
  }

  async rollbackAll() {
    this.migrated = false
    this.version = null
    await this.knex.migrate.rollback(undefined, true)
    this.logger.info('Migrations rollback completed')
  }

  async closeConnection() {
    await this.knex.destroy()
    this.logger.debug('Connection closed')
  }
}
