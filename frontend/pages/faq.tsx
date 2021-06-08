import cx from 'classnames'
import React from 'react'

import { AppContainer } from '../components/AppContainer'
import { PageGrid } from '../components/PageGrid'
import styles from '../styles/Home.module.scss'

export default function Faq() {
  return (
    <AppContainer>
      <h2 className={styles.overview}>FAQ</h2>
      <PageGrid>
        <div className={cx(styles.card, styles.cardBg)}>
          <div>
            <div className={styles.title}>
              <h3>How exactly do we calculate metrics like TVL etc.?</h3>
            </div>
            <p>
              It varies from project to project but we generally track the amount of tokens locked in all token bridges
              for a given L2. Sometimes it's a single token bridge like for zkSync but sometimes these are multiple
              token bridges for a single L2 (Optimism).
            </p>
            <p>
              For details see our{' '}
              <a href="https://github.com/l2beat/l2beat/tree/master/config/src/projects">project definitions</a>.
            </p>
          </div>

          <div>
            <div className={styles.title}>
              <h3>I want to add a new project or improve some info?</h3>
            </div>
            <p>
              Everything is <a href="https://github.com/l2beat/l2beat">open source</a> - just create a PR. If you want
              to add a new project you should read our{' '}
              <a href="https://github.com/l2beat/l2beat/tree/master/CONTRIBUTING.md">contributing guidelines</a>.
            </p>
          </div>

          <div>
            <div className={styles.title}>
              <h3>Who is behind this project?</h3>
            </div>
            <p>
              <a href="https://twitter.com/krzKaczor">@krzkaczor</a> (coordination),{' '}
              <a href="https://twitter.com/DamianPaszkowsk">@DamianPaszkowsk</a> (frontend),{' '}
              <a href="https://twitter.com/piotrklis_">@piotr.klis</a> (data),{' '}
              <a href="https://twitter.com/bkiepuszewski">@bkiepuszewski</a> (idea/data)
            </p>
          </div>
        </div>
      </PageGrid>
    </AppContainer>
  )
}
