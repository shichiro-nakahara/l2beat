import React from 'react'

interface Props {
  ids: number[]
  citationNeededLink?: string
}

export function InlineReferences({ ids, citationNeededLink }: Props) {
  if (ids.length === 0) {
    if (citationNeededLink) {
      return (
        <sup>
          <a className="text-link underline" href={citationNeededLink}>
            [Citation needed]
          </a>
        </sup>
      )
    } else {
      return null
    }
  }
  return (
    <sup>
      {ids.map((id) => (
        <a className="text-link underline" key={id} href={`#reference-${id}`}>
          [{id}]
        </a>
      ))}
    </sup>
  )
}
