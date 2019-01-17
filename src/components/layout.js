/*

The query here gets information about the title of the site, as well as icons to put in the footer that tell information about how the site was built.

*/

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { TypographyStyle, GoogleFont } from 'react-typography';

//Typography JS Things
import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'

// import './layout.css'

import './layout_new.css'

import Header from './header'

//Changing text colours
moragaTheme.overrideThemeStyles = (options) => ({
  'h1,h2,h3': {
    Color: 'BlanchedAlmond',
  },
  'p' : {
    Color: 'BlanchedAlmond',
  }
})


const typography = new Typography(moragaTheme)

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        homepageInfo: contentfulHomepage(slug: {eq: "home"}) {
          id
          homepageTitle
        }
        builtIcons: contentfulWork(slug: {eq: "sean-cotterill-portfolio"}) {
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
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <div className="master-container">
          <Header siteTitle={data.homepageInfo.homepageTitle} />
          <div
            className="body-container"
            style={{
              margin: `0 auto`,
              padding: `0px 4rem`,
              paddingTop: 0,
            }}
          >
            {children}
            </div>
            <footer className="page-footer">
            <div className="footer-info">
              Sean Cotterill, 2019
            </div>
            <ul className="footer-icons">
              <span style={{marginRight: `10px`}}>Created using:</span>
              {
                data.builtIcons.technologyIcons.map(data => {
                  return(
                    <li key={data.id} className="footer-icon">
                      <div className="footer-icon" key={data.id}>
                        <img src={`http://${data.file.url}`} alt={data.title} />
                      </div>
                    </li>
                  )
                })
              }
              </ul>
            </footer>
          </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
