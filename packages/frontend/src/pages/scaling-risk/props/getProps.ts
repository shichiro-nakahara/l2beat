import { ApiMain } from '@l2beat/types'

import { Config } from '../../../build/config'
import { getFooterProps, getNavbarProps } from '../../../components'
import { getIncludedProjects } from '../../../utils/getIncludedProjects'
import { orderByTvl } from '../../../utils/orderByTvl'
import { Wrapped } from '../../Page'
import { ScalingRiskPageProps } from '../view/ScalingRiskPage'
import { getPageMetadata } from './getPageMetadata'
import { getRiskView } from './getRiskView'

export function getProps(
  config: Config,
  apiMain: ApiMain,
): Wrapped<ScalingRiskPageProps> {
  const included = getIncludedProjects(config.layer2s, apiMain)
  const ordering = orderByTvl(included, apiMain)

  return {
    props: {
      navbar: getNavbarProps(config),
      riskView: getRiskView(ordering),
      footer: getFooterProps(config),
      showActivity: config.features.activity,
    },
    wrapper: {
      metadata: getPageMetadata(),
    },
  }
}
