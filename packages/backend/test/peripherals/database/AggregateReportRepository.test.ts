import { Logger, ProjectId, UnixTime } from '@l2beat/common'
import { expect } from 'earljs'

import {
  AggregateReportRecord,
  AggregateReportRepository,
} from '../../../src/peripherals/database/AggregateReportRepository'
import { setupDatabaseTestSuite } from './shared/setup'

describe(AggregateReportRepository.name, () => {
  const { database } = setupDatabaseTestSuite()
  const repository = new AggregateReportRepository(database, Logger.SILENT)

  const TIME_0 = UnixTime.now().toStartOf('day')
  const TIME_1 = TIME_0.add(1, 'hours')
  const TIME_2 = TIME_0.add(2, 'hours')

  const PROJECT_A = ProjectId('project-a')
  const PROJECT_B = ProjectId('project-b')

  beforeEach(async () => {
    await repository.deleteAll()
  })

  describe(AggregateReportRepository.prototype.getDaily.name, () => {
    it('returns only full days', async () => {
      const REPORT = fakeAggregateReport({ timestamp: TIME_0 })
      await repository.addOrUpdateMany([REPORT])
      await repository.addOrUpdateMany([
        fakeAggregateReport({ timestamp: TIME_1 }),
      ])
      const result = await repository.getDaily()
      expect(result).toEqual([REPORT])
    })

    it('returns sorted data', async () => {
      const REPORTS = [
        fakeAggregateReport({ timestamp: TIME_0.add(-2, 'days') }),
        fakeAggregateReport({ timestamp: TIME_0.add(-1, 'days') }),
        fakeAggregateReport({ timestamp: TIME_0 }),
      ]
      await repository.addOrUpdateMany([REPORTS[0]])
      await repository.addOrUpdateMany([REPORTS[1]])
      await repository.addOrUpdateMany([REPORTS[2]])
      const result = await repository.getDaily()
      expect(result).toEqual(REPORTS)
    })
  })

  describe(AggregateReportRepository.prototype.getSixHourly.name, () => {
    it('returns only six hourly reports', async () => {
      const REPORT = fakeAggregateReport({ timestamp: TIME_0.add(-6, 'hours') })
      await repository.addOrUpdateMany([REPORT])
      await repository.addOrUpdateMany([
        fakeAggregateReport({ timestamp: TIME_0.add(-8, 'hours') }),
      ])
      await repository.addOrUpdateMany([
        fakeAggregateReport({
          timestamp: TIME_0.add(-90, 'days').add(-1, 'minutes'),
        }),
      ])
      const result = await repository.getSixHourly(TIME_0.add(-1, 'days'))
      expect(result).toEqual([REPORT])
    })

    it('returns sorted data', async () => {
      const REPORTS = [
        fakeAggregateReport({ timestamp: TIME_0.add(-12, 'hours') }),
        fakeAggregateReport({ timestamp: TIME_0.add(-6, 'hours') }),
        fakeAggregateReport({ timestamp: TIME_0 }),
      ]
      await repository.addOrUpdateMany([REPORTS[0]])
      await repository.addOrUpdateMany([REPORTS[1]])
      await repository.addOrUpdateMany([REPORTS[2]])
      const result = await repository.getSixHourly(TIME_0.add(-1, 'days'))
      expect(result).toEqual(REPORTS)
    })
  })

  describe(AggregateReportRepository.prototype.getHourly.name, () => {
    it('returns only last 7 days', async () => {
      const REPORT = fakeAggregateReport({ timestamp: TIME_0 })
      await repository.addOrUpdateMany([REPORT])
      await repository.addOrUpdateMany([
        fakeAggregateReport({
          timestamp: TIME_0.add(-7, 'days').add(-1, 'minutes'),
        }),
      ])
      const result = await repository.getHourly(TIME_0.add(-1, 'days'))
      expect(result).toEqual([REPORT])
    })

    it('returns sorted data', async () => {
      const REPORTS = [
        fakeAggregateReport({ timestamp: TIME_0.add(-2, 'days') }),
        fakeAggregateReport({ timestamp: TIME_0.add(-1, 'days') }),
        fakeAggregateReport({ timestamp: TIME_0 }),
      ]
      await repository.addOrUpdateMany([REPORTS[0]])
      await repository.addOrUpdateMany([REPORTS[1]])
      await repository.addOrUpdateMany([REPORTS[2]])
      const result = await repository.getHourly(TIME_0.add(-7, 'days'))
      expect(result).toEqual(REPORTS)
    })
  })

  describe(AggregateReportRepository.prototype.addOrUpdateMany.name, () => {
    it('replaces existing records', async () => {
      const REPORTS = [
        fakeAggregateReport({
          projectId: ProjectId('1'),
          timestamp: TIME_1,
          tvlUsd: 1n,
        }),
        fakeAggregateReport({
          projectId: ProjectId('2'),
          timestamp: TIME_1,
          tvlUsd: 2n,
        }),
        fakeAggregateReport({
          projectId: ProjectId('3'),
          timestamp: TIME_1,
          tvlUsd: 3n,
        }),
        fakeAggregateReport({
          projectId: ProjectId('4'),
          timestamp: TIME_1,
          tvlUsd: 4n,
        }),
      ]
      await repository.addOrUpdateMany(REPORTS.slice(0, 2))
      expect(await repository.getAll()).toEqual(REPORTS.slice(0, 2))
      await repository.addOrUpdateMany(REPORTS.slice(2))
      expect(await repository.getAll()).toEqual(REPORTS.slice(2))
    })

    it('handles empty array', async () => {
      await expect(repository.addOrUpdateMany([])).not.toBeRejected()
    })

    it('throws if timestamps do not match', async () => {
      await expect(
        repository.addOrUpdateMany([
          fakeAggregateReport({ timestamp: TIME_1 }),
          fakeAggregateReport({ timestamp: TIME_2 }),
        ]),
      ).toBeRejected('Programmer error: Timestamps must match')
    })
  })

  describe(AggregateReportRepository.prototype.getAll.name, () => {
    it('returns all records', async () => {
      const reports = [
        fakeAggregateReport({ projectId: PROJECT_A, timestamp: TIME_0 }),
        fakeAggregateReport({ projectId: PROJECT_B, timestamp: TIME_0 }),
      ]
      await repository.addOrUpdateMany(reports)
      const results = await repository.getAll()
      expect(results).toEqual(reports)
    })
  })

  describe(AggregateReportRepository.prototype.deleteAll.name, () => {
    it('deletes all reports', async () => {
      const reports = [
        fakeAggregateReport({ projectId: PROJECT_A, timestamp: TIME_0 }),
        fakeAggregateReport({ projectId: PROJECT_B, timestamp: TIME_0 }),
      ]
      await repository.addOrUpdateMany(reports)
      await repository.deleteAll()
      const results = await repository.getAll()
      expect(results).toEqual([])
    })
  })
})

function fakeAggregateReport(
  report?: Partial<AggregateReportRecord>,
): AggregateReportRecord {
  return {
    timestamp: UnixTime.now(),
    projectId: ProjectId('fake-project'),
    tvlUsd: 1234n,
    tvlEth: 1234n,
    ...report,
  }
}
