import { layer2s } from '@l2beat/config'
import { ProjectId } from '@l2beat/types'
import { Meta, Story } from '@storybook/react'
import React, { useEffect } from 'react'

import { configureChart } from '../../components/chart/configure'
import { MetaImage } from '../../pages/meta-images/MetaImage'

export default {
  title: 'Other/MetaImage',
  argTypes: {
    projectId: {
      control: 'select',
      options: layer2s.map((x) => x.id),
    },
  },
} as Meta

interface TemplateProps {
  projectId?: ProjectId
}

function Template({ projectId }: TemplateProps) {
  useEffect(() => {
    configureChart()
  })
  const project = layer2s.find((x) => x.id === projectId)
  return (
    <div className="meta flex items-center justify-center">
      <div className="relative w-[600px] min-w-[600px] h-[314px] min-h-[314px] shadow-2xl rounded-lg overflow-hidden">
        <MetaImage
          tvl="$1.34 B"
          sevenDayChange="+3.45%"
          name={project?.name}
          icon={project?.slug && `/icons/${project.slug}.png`}
          apiEndpoint="/fakeTvl.json"
        />
      </div>
    </div>
  )
}

export const Project: Story<TemplateProps> = Template.bind({})
Project.args = {
  projectId: ProjectId('nova'),
}

export const Overview: Story<TemplateProps> = Template.bind({})
