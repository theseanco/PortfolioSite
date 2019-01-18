import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import './header.css'

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      {
        contentfulAuthor {
          linkList {
            id
            links {
              Link
              LinkType
            }
          }
        }
      }
      `}
      render={data => (
  <div
    className="topBar"
  >
          <h1>
          {/*THESE ARE CONDITIONALLY RENDERED BASED ON MEDIA QUERIES!*/}
        <Link className="header-big-home-link"
          to="/"
          state={{
            noAnimation: true
          }}
        >
          {siteTitle}
        </Link>
        </h1>
        <Link className="header-small-home-link"
          to="/"
          state={{
            noAnimation: true
          }}
        >
          Home
        </Link>

        <ul className="header-link-list">
          {
            data.contentfulAuthor.linkList.links.map(data => {
              return (
                <li key={`header-${data.linkType}`}>
                  <a href={data.Link} className="header-link">
                    {data.LinkType}
                  </a>
                </li>
              )
            })
          }
          <li>
            <Link
            className="header-link"
              to="/about"
              >About</Link>
          </li>
        </ul>


  </div>
)}
/>
)

export default Header
