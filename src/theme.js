import { css } from 'styled-components'

const colors = {
  stormy: '#494E6B',
  cloud: '#98878F',
  sunset: '#985E6D',
  evening: '#192231',
};

const animations = {
  fadein: '.3s',
  revealAnimation: '3s'
}

const sizes = {
  desktop: 992,
  tablet: 768,
  smallTablet: 600,
  phone: 576,
  smallPhone: 480
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

const theme = {
  colors,
  animations,
	sizes,
	media
}

export default theme
