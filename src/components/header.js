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
      <header className="topBar">
        <h1 className="header-big-home-link">
          {/*THESE ARE CONDITIONALLY RENDERED BASED ON MEDIA QUERIES!*/}
          <Link
            to="/"
            state={{
              noAnimation: true,
            }}
            style={{
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        <ul className="header-link-list">
          <li>
            <Link
              className="header-small-home-link"
              to="/"
              state={{
                noAnimation: true,
              }}
            >
              Home
            </Link>
          </li>
          {data.contentfulAuthor.linkList.links.map(data => {
            return (
              <li key={`header-${data.LinkType}`}>
                <a href={data.Link} className="header-link-pages">
                  {data.LinkType}
                </a>
              </li>
            )
          })}
          <li>
            <Link className="header-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </header>
    )}
  />
)

export default Header
