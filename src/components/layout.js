/*

The query here gets information about the title of the site, as well as icons to put in the footer that tell information about how the site was built.

*/

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
// import './layout.css'

import Header from './header'
import Footer from './footer'

//styled-components theme
import theme from '../theme'

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
          <div className="master-container">
            <div className="body-container">
              <Header siteTitle={data.homepageInfo.homepageTitle} />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
