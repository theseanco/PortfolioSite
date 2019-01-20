/*

The query here gets information about the title of the site, as well as icons to put in the footer that tell information about how the site was built.

*/

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
// import './layout.css'


import Header from './header'

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
        <div className="master-container">

          <div
            className="body-container"
          >
          <Header siteTitle={data.homepageInfo.homepageTitle} />
            {children}
            <footer className="page-footer">
            <div className="footer-info">
              Sean Cotterill, 2019
            </div>
            <ul className="footer-icons">
              <span style={{marginRight: `10px`, color: `White`}}>Created using:</span>
              {
                data.builtIcons.technologyIcons.map(data => {
                  return(
                    <li key={data.id} className="footer-icon">
                      <div className="footer-icon" key={data.id}>
                        <img src={`https://${data.file.url}`} alt={data.title} />
                      </div>
                    </li>
                  )
                })
              }
              </ul>
            </footer>
            </div>
          </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
