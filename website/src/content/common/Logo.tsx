interface Props {
  className?: string
}

export function Logo({ className }: Props) {
  return (
    <svg
      className={className ? `logo ${className}` : 'logo'}
      width="88"
      height="36"
      viewBox="0 0 88 36"
      fill="none"
      xmlns="http://www.w3.org/2/svg"
      role="img"
      aria-label="L2BEAT logo"
    >
      <g className="logo-animation">
        <path
          d="M15.75 1.53C17.37 2.48 18.80 3.70 19.60 5.43L26.16 1.53L33.81 5.20L35.55 11.91L19.89 31.42L16.55 34.60L4.07 19.31C3.43 18.58 2.80 17.75 2.19 16.83C1.55 15.92 1.03 14.96 0.64 13.95C0.21 12.94 0 11.95 0 10.97C0 8.74 0.42 6.82 1.28 5.20C2.10 3.58 3.28 2.33 4.80 1.44C6.33 0.56 8.13 0.11 10.21 0.11C12.26 0.11 14.10 0.59 15.75 1.53Z"
          fill="var(--brand-red)"
        />
        <path
          d="M17.15 17.36H6.77V30.22H17.15V17.36Z"
          fill="var(--brand-red)"
        />
        <path
          d="M16.96 35.20C17.42 35.65 17.99 35.88 18.66 35.88L35.61 35.64C36.29 35.64 36.91 35.55 37.31 34.95C37.83 34.17 36.45 31.18 34.63 30.97C32.82 30.75 27.73 30.74 24.83 30.48C24.60 30.46 24.54 30.13 24.62 29.91C24.83 29.29 33.27 19.30 33.27 19.30C33.91 18.57 34.54 17.74 35.15 16.83C35.79 15.91 36.31 14.95 36.71 13.94C37.13 12.93 37.35 11.94 37.35 10.96C37.35 8.73 36.92 6.81 36.06 5.19C35.24 3.57 34.06 2.32 32.54 1.44C31.01 0.55 29.21 0.11 27.13 0.11C25.09 0.11 23.24 0.58 21.59 1.53C19.97 2.47 18.54 3.70 17.74 5.42C17.27 6.43 17 8.07 17.27 9.18C17.50 10.09 17.73 10.32 18.42 10.55C19.11 10.78 19.33 10.28 19.56 9.18C19.79 8.08 20.17 6.84 20.71 5.97C21.40 4.87 22.67 4.06 23.69 3.68C24.55 3.36 25.98 3.09 27.13 3.22C29.18 3.45 30.63 4.18 31.70 5.42C32.78 6.66 33.61 8.72 33.37 10.28L33.36 10.33C33.22 11.29 33.02 12.60 32.54 13.53C32.05 14.48 30.56 16.35 29.64 17.42L16.96 31.90C16.54 32.33 16.32 32.87 16.32 33.55C16.32 34.19 16.54 34.74 16.96 35.20Z"
          fill="var(--text)"
        />
        <path
          d="M4.40 22.70C4.40 22.59 4.40 22.20 4.40 21.55C4.43 20.86 4.44 20.09 4.44 19.24C4.47 18.36 4.47 17.50 4.44 16.68C4.44 15.83 4.41 15.17 4.36 14.70C4.30 14.10 4.29 13.56 4.32 13.09C4.37 12.63 4.40 12.10 4.40 11.53C4.40 11.14 4.41 10.80 4.44 10.50C4.47 10.17 4.54 9.89 4.65 9.67C4.76 9.42 4.93 9.25 5.18 9.14C5.43 9 5.79 8.93 6.25 8.93C6.69 8.93 7.12 9.08 7.53 9.38C7.97 9.69 8.23 10.10 8.31 10.62L8.93 18.82L9.06 29.30L14.58 29.13C14.77 29.13 15.05 29.23 15.41 29.42C15.79 29.58 15.98 29.79 15.98 30.04C15.98 30.26 15.89 30.45 15.69 30.61C15.50 30.75 15.27 30.88 14.99 30.99C14.75 31.07 14.48 31.14 14.21 31.19C13.96 31.22 13.78 31.23 13.67 31.23C13.45 31.26 13.12 31.29 12.68 31.32C12.24 31.32 11.78 31.32 11.28 31.32C10.82 31.32 10.36 31.32 9.92 31.32C9.48 31.32 9.15 31.32 8.93 31.32C8.66 31.45 8.33 31.51 7.94 31.48C7.56 31.45 7.24 31.44 7 31.44H5.72C5.50 31.44 5.25 31.38 4.98 31.27C4.73 31.14 4.54 30.99 4.40 30.82V22.70Z"
          fill="var(--text)"
        />
      </g>
      <path
        d="M40.26 29.21C40.26 28.69 40.27 28.19 40.30 27.72C40.35 27.26 40.38 26.78 40.38 26.28V25.04C40.38 24.93 40.37 24.74 40.34 24.47C40.31 24.17 40.28 23.86 40.26 23.56C40.26 23.23 40.24 22.93 40.21 22.65C40.19 22.38 40.17 22.19 40.17 22.08V17.75V13.58C40.17 12.81 40.21 12.07 40.30 11.36C40.41 10.62 40.43 9.89 40.38 9.17C40.93 8.54 41.59 8.16 42.36 8.02C43.13 7.85 43.91 7.77 44.71 7.77C45.86 7.77 46.91 8 47.84 8.47C48.78 8.91 49.56 9.71 50.19 10.86C50.66 11.77 50.99 12.62 51.18 13.42C51.37 14.19 51.47 15.08 51.47 16.10V17.25C51.25 17.94 51 18.57 50.73 19.15C50.48 19.70 50.08 20.21 49.53 20.67C49.34 20.81 49.11 20.95 48.83 21.09C48.56 21.20 48.36 21.32 48.25 21.46C49.30 22.06 50.05 22.78 50.52 23.60C51.02 24.43 51.26 25.42 51.26 26.57V27.64C51.21 27.97 51.07 28.34 50.85 28.76C50.63 29.14 50.41 29.44 50.19 29.66C49.64 30.13 49.16 30.47 48.75 30.69C48.34 30.91 47.92 31.08 47.51 31.19C47.10 31.30 46.66 31.35 46.19 31.35C45.73 31.35 45.16 31.35 44.50 31.35H43.02C42.80 31.30 42.63 31.24 42.52 31.19C42.44 31.13 42.36 31.08 42.28 31.02C42.22 30.94 42.14 30.87 42.03 30.82C41.95 30.73 41.81 30.65 41.62 30.57C41.45 30.49 41.30 30.43 41.16 30.40C41.05 30.38 40.94 30.35 40.83 30.32C40.75 30.29 40.65 30.25 40.54 30.20C40.46 30.14 40.37 30.05 40.26 29.91V29.21ZM43.72 28.55L43.80 29.08C43.97 29.14 44.12 29.21 44.26 29.29C44.39 29.35 44.52 29.40 44.63 29.46C44.74 29.51 44.85 29.55 44.96 29.58H45.04C45.51 29.58 45.97 29.40 46.44 29.04C46.91 28.69 47.14 28.22 47.14 27.64C47.14 27.34 47.17 27.02 47.22 26.69C47.31 26.36 47.28 25.87 47.14 25.21C47 24.41 46.62 23.82 45.99 23.44C45.35 23.05 44.71 22.86 44.05 22.86H43.80C43.75 23.66 43.72 24.37 43.72 25.00C43.72 25.64 43.72 26.34 43.72 27.11V28.55ZM43.72 20.51C44.90 20.04 45.73 19.40 46.19 18.57C46.69 17.75 46.93 16.72 46.93 15.48C46.93 15.01 46.92 14.44 46.89 13.75C46.87 13.06 46.77 12.40 46.61 11.77C46.44 11.14 46.18 10.60 45.82 10.16C45.46 9.69 44.96 9.46 44.30 9.46C43.72 9.46 43.14 9.57 42.56 9.79V10.12C42.56 10.56 42.61 10.97 42.69 11.36C42.80 11.74 42.88 12.10 42.94 12.43L43.72 20.51ZM53.44 27.48C53.38 26.32 53.28 25.11 53.15 23.85C53.04 22.58 52.90 21.38 52.74 20.22V17.17V14.08C52.74 14.02 52.74 13.86 52.74 13.58C52.76 13.31 52.78 13.01 52.78 12.68C52.80 12.35 52.83 12.03 52.86 11.73C52.89 11.40 52.91 11.17 52.94 11.03C53.02 10.34 53.37 9.83 53.97 9.50C54.60 9.17 55.32 8.95 56.12 8.84C56.94 8.71 57.76 8.65 58.59 8.68C59.41 8.68 60.07 8.68 60.57 8.68H60.32C60.51 8.68 60.77 8.72 61.10 8.80C61.46 8.86 61.64 9.01 61.64 9.25C61.64 9.45 61.56 9.60 61.39 9.71C61.26 9.79 61.09 9.83 60.90 9.83C60.90 9.83 60.73 9.86 60.40 9.91C60.07 9.94 59.69 10 59.25 10.08C58.84 10.13 58.42 10.20 58.01 10.29C57.63 10.34 57.39 10.38 57.31 10.41C56.95 10.49 56.72 10.68 56.61 10.99V12.02V13.13C56.64 13.57 56.67 14.13 56.69 14.82C56.75 15.51 56.79 16.19 56.82 16.88C56.84 17.54 56.87 18.13 56.90 18.65C56.93 19.15 56.94 19.41 56.94 19.44L57.11 19.89C57.65 19.89 58.22 19.88 58.80 19.85C59.37 19.80 59.91 19.75 60.40 19.73C60.82 19.70 61.19 19.77 61.52 19.93C61.87 20.10 62.05 20.32 62.05 20.59C62.05 20.81 61.97 20.99 61.80 21.13C61.67 21.24 61.49 21.33 61.27 21.42C61.05 21.47 60.83 21.53 60.61 21.58C60.39 21.61 60.22 21.64 60.11 21.66C59.70 21.72 59.40 21.77 59.21 21.83C59.02 21.86 58.84 21.88 58.67 21.91C58.51 21.91 58.31 21.91 58.09 21.91C57.90 21.91 57.60 21.91 57.19 21.91C57.19 22.98 57.17 24.04 57.15 25.09C57.12 26.10 57.11 27.15 57.11 28.22C57.52 28.22 57.83 28.22 58.05 28.22C58.27 28.19 58.48 28.18 58.67 28.18C58.86 28.15 59.07 28.14 59.29 28.14C59.54 28.11 59.87 28.10 60.28 28.10C60.42 28.10 60.61 28.11 60.86 28.14C61.13 28.16 61.39 28.22 61.64 28.30C61.91 28.36 62.15 28.45 62.34 28.59C62.53 28.73 62.63 28.92 62.63 29.17C62.63 29.39 62.55 29.58 62.38 29.74C62.22 29.88 62.01 30.01 61.76 30.12C61.54 30.20 61.32 30.28 61.10 30.36C60.88 30.42 60.72 30.46 60.61 30.49H58.01H57.11C57.05 30.49 56.93 30.49 56.73 30.49C56.57 30.46 56.38 30.45 56.16 30.45C55.96 30.42 55.77 30.40 55.58 30.40C55.41 30.38 55.29 30.36 55.21 30.36C54.91 30.36 54.58 30.31 54.22 30.20C53.86 30.06 53.60 29.87 53.44 29.62V27.48ZM63.07 30.07C63.07 29.61 63.10 28.98 63.15 28.18C63.24 27.35 63.32 26.56 63.40 25.79C63.48 24.99 63.55 24.30 63.61 23.73C63.69 23.15 63.73 22.85 63.73 22.82L65.30 11.23C65.30 11.21 65.31 11.10 65.34 10.90C65.39 10.71 65.45 10.49 65.50 10.24C65.56 10 65.61 9.76 65.67 9.54C65.72 9.30 65.77 9.12 65.79 9.01C65.82 8.87 65.85 8.72 65.88 8.55C65.93 8.36 65.98 8.18 66.04 8.02C66.09 7.85 66.18 7.72 66.29 7.61C66.40 7.50 66.55 7.44 66.74 7.44H68.31C68.53 7.44 68.72 7.55 68.88 7.77C69.05 7.99 69.17 8.20 69.26 8.39C69.34 8.64 69.45 8.95 69.59 9.34C69.75 9.69 69.92 10.05 70.08 10.41C70.25 10.77 70.38 11.10 70.49 11.40C70.60 11.67 70.66 11.82 70.66 11.85C71.59 14.90 72.53 17.93 73.46 20.92C74.40 23.92 75.15 26.82 75.73 29.62V29.83C75.73 30.27 75.52 30.60 75.11 30.82C74.73 31.04 74.38 31.15 74.08 31.15C73.97 31.15 73.79 31.15 73.54 31.15C73.30 31.12 73.03 31.09 72.76 31.06C72.51 31.01 72.28 30.93 72.06 30.82C71.87 30.71 71.76 30.56 71.73 30.36L70.57 24.01C70.03 24.01 69.35 24.03 68.55 24.06C67.79 24.08 67.11 24.10 66.53 24.10L66.37 24.22C66.26 26.42 66 28.60 65.59 30.78L65.42 31.02C65.37 31.08 65.24 31.20 65.05 31.39C64.89 31.56 64.78 31.67 64.72 31.72H64.60C64.16 31.72 63.79 31.60 63.48 31.35C63.21 31.11 63.07 30.83 63.07 30.53V30.07ZM69.96 21.75V21.13C69.93 21.02 69.89 20.84 69.83 20.59C69.81 20.32 69.76 20.04 69.71 19.77C69.65 19.49 69.60 19.25 69.54 19.03C69.52 18.78 69.49 18.61 69.46 18.53C69.41 18.28 69.30 17.90 69.13 17.38C68.99 16.83 68.83 16.26 68.64 15.69C68.47 15.11 68.31 14.56 68.14 14.04C67.98 13.51 67.85 13.13 67.77 12.88L66.62 21.75H69.96ZM79.58 29.58V28.55C79.58 28.22 79.58 27.70 79.58 26.98C79.61 26.24 79.63 25.42 79.63 24.51C79.65 23.60 79.68 22.65 79.71 21.66C79.74 20.65 79.76 19.69 79.79 18.78C79.82 17.87 79.85 17.06 79.87 16.35C79.90 15.63 79.93 15.10 79.96 14.74C79.96 14.05 80 13.38 80.08 12.72C80.19 12.06 80.23 11.36 80.20 10.62H76.86C76.67 10.62 76.45 10.57 76.20 10.49C75.98 10.38 75.87 10.22 75.87 10.00C75.87 9.80 75.92 9.67 76 9.58C76.11 9.50 76.27 9.42 76.49 9.34C77.32 9.34 78.10 9.31 78.84 9.25C79.61 9.20 80.37 9.14 81.11 9.09C81.85 9.01 82.61 8.94 83.38 8.88C84.15 8.83 84.96 8.80 85.81 8.80H87.21L88 9.21V9.50C88 9.78 87.83 9.97 87.50 10.08C87.20 10.19 86.83 10.27 86.39 10.33C85.84 10.41 85.26 10.44 84.66 10.41C84.08 10.38 83.69 10.41 83.50 10.49V13.95C83.50 15.52 83.54 17.07 83.63 18.61C83.71 20.15 83.75 21.66 83.75 23.15C83.75 23.86 83.75 24.54 83.75 25.17C83.78 25.80 83.79 26.42 83.79 27.02C83.79 27.63 83.76 28.23 83.71 28.84C83.68 29.44 83.61 30.09 83.50 30.78C83.36 30.94 83.19 31.08 82.97 31.19C82.75 31.27 82.54 31.34 82.35 31.39H81.32C81.01 31.39 80.70 31.39 80.37 31.39C80.04 31.37 79.78 31.16 79.58 30.78V29.58Z"
        fill="var(--text)"
      />
    </svg>
  )
}
