import {DefaultTheme} from 'styled-components'

export const theme: DefaultTheme = {
  color: {
    black: '#0000',
    gray: '#A9AFBC',
    darkgray: '#2a303b',
    white: '#fff',
    white_opacity: 'ffffffb7',
  },
}

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`

export const media = {
  custom: customMediaQuery,
  laptop: customMediaQuery(1440),
  mobile: customMediaQuery(420),
}
