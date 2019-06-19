/*

The query here gets information about the title of the site, as well as icons to put in the footer that tell information about how the site was built.

*/

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
// import './layout.css'

import Header from './Header/header'
import Footer from './Footer/footer'

//styled-components theme
import theme from '../theme'

// CSS Reset
const GlobalStyle = createGlobalStyle`
	dy, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed,
	figure, figcaption, footer, header, hgroup,
	main, menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure,
	footer, header, hgroup, main, menu, nav, section {
		display: block;
	}
	/* HTML5 hidden-attribute fix for newer browsers */
	*[hidden] {
			display: none;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
  html {
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.colors.evening}
  }
`

const FlexContainer = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	padding: 0 3rem;
`

const FlexGrowContent = styled.body`
	flex-grow: 1
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        homepageInfo: contentfulHomepage(slug: { eq: "home" }) {
          id
          homepageTitle
        }
        builtIcons: contentfulWork(slug: { eq: "sean-cotterill-portfolio" }) {
          technologyIcons {
            id
            title
            file {
              url
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <ThemeProvider theme={theme}>
					<>
	          <GlobalStyle />
							<FlexContainer>
								<Header siteTitle={data.homepageInfo.homepageTitle} />
								<FlexGrowContent>
									{children}
								</FlexGrowContent>
								<Footer />
						</FlexContainer>
					</>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
