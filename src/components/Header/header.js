/*
 * - Is H1 tag good for accessibility?
 * - Finish styling
 *
 *
 */

import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  align-items: center;
  border-bottom: 2px solid var(--stormy);
  color: White;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  padding: 1em 2em;

  h1 {
    display: none;
  }

  ${props => props.theme.media.tablet`
    h1 {
      color: White;
      display: block;
      font-size: 2.5rem;
      font-weight: 100;
      letter-spacing: -4px;
      text-decoration: none;
    }
  `}
`

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
      <StyledHeader>
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
      </StyledHeader>
    )}
  />
)

export default Header
