import { ProjectRiskCategory } from '@l2beat/config'
import { Section } from './Section'

export interface RiskSectionProps {
  riskGroups: RiskGroup[]
}

export interface RiskGroup {
  start: number
  name: ProjectRiskCategory
  items: RiskItem[]
}

export interface RiskItem {
  text: string
  referencedId: string
}

export function RiskSection({ riskGroups }: RiskSectionProps) {
  return (
    <Section title="Risk summary" id="risks">
      {riskGroups.map((group, i) => (
        <div className="RiskSection-Group" key={i}>
          <p className="RiskSection-Title">{group.name}&hellip;</p>
          <ol className="RiskSection-Risks" start={group.start}>
            {group.items.map((item, i) => (
              <li className="RiskSection-Risk" key={i}>
                <a href={`#${item.referencedId}`}>{item.text}</a>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </Section>
  )
}
