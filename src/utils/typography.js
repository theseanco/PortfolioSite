import Typography from "typography"
import moragaTheme from "typography-theme-moraga"

moragaTheme.overrideThemeStyles = (options) => ({
  'h1,h2,h3': {
    Color: 'BlanchedAlmond',
    textAlign: 'center'
  },
  'h2': {
    textAlign: 'center'
  },
  'h3': {
    fontSize: '2rem'
  },
  'p' : {
    Color: 'BlanchedAlmond',
  }
})

const typography = new Typography(moragaTheme)

export default typography
