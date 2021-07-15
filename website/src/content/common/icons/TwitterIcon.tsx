import { SVGAttributes } from 'react'
import { Icon } from './Icon'

export function TwitterIcon(props: SVGAttributes<SVGElement>) {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path d="M7.54 22.5C16.6 22.5 21.55 15 21.55 8.5C21.55 8.29 21.55 8.08 21.54 7.87C22.51 7.17 23 6.5 23.5 5.5C22.5 6 22 6 21 6C22.03 5.38 22.63 4.64 23 3.5C22.03 4.07 21.31 4.34 20.21 4.55C19.46 3.76 18.48 3.24 17.41 3.06C16.34 2.89 15.24 3.07 14.29 3.58C13.33 4.09 12.57 4.91 12.12 5.89C11.68 6.88 11.57 7.99 11.81 9.04C9.85 8.95 7.94 8.44 6.19 7.55C4.44 6.67 2.9 5.42 1.66 3.9C1.03 4.99 0.84 6.27 1.13 7.49C1.41 8.71 2.15 9.78 3.19 10.47C2.41 10.45 1.64 10.24 0.96 9.86V9.93C0.96 11.07 1.35 12.17 2.07 13.05C2.79 13.93 3.79 14.53 4.91 14.76C4.49 14.87 4.05 14.93 3.61 14.93C3.3 14.93 2.99 14.9 2.69 14.84C3 15.82 3.62 16.68 4.44 17.29C5.27 17.9 6.26 18.24 7.29 18.26C5.54 19.63 3.39 20.37 1.17 20.37C0.78 20.37 0.39 20.35 0 20.3C2.25 21.74 4.87 22.5 7.54 22.5Z" />
    </Icon>
  )
}
