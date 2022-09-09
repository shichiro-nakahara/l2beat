import { bridges, layer2s } from '@l2beat/config'
import { expect } from 'earljs'
import { existsSync } from 'fs'
import path from 'path'

describe('icons', () => {
  for (const project of [...layer2s, ...bridges]) {
    it(`${project.name} has an associated icon`, () => {
      const iconPath = path.join(
        __dirname,
        `../../src/static/icons/${project.slug}.png`,
      )
      expect(existsSync(iconPath)).toEqual(true)
    })
  }
})
