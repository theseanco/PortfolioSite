/*
 * TODO!
 * - Is H1 tag good for accessibility?
 * - Breakpoints need editing
 * - Top nav breakpoint flex container styling
 */

import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

// Styles for header
const StyledHeader = styled.header`
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.stormy};
  color: White;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  padding: 1em 2em;

  h1 {

    a {
      display: none;
      color: White;
      margin: 0;
    }
  }

  ${props => props.theme.media.phone`
    justify-content: space-between;
  `}

  ${props => props.theme.media.tablet`
    justify-content: space-between;
    h1 {
      a {
        color: White;
        display: block;
        font-size: 2.5rem;
        font-weight: 100;
        letter-spacing: -4px;
        text-decoration: none;
      }
    }
  `}
`

// Style for the links
const HeaderLinkList = styled.nav`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin: 0;
  justify-content: space-between;

  a {
    font-weight: 100;
    font-size: 1.25rem;
    padding: 0 1rem;
    margin: 0;
    color: White;
  }

  ${props => props.theme.media.tablet`
    padding: 0 0.4rem

    a {
      width: 100%
    }
  `}

  ${props => props.theme.media.desktop`
    a {
      padding: 0 1rem;
    }
  `}
`

const HeaderSmallHomeLink = styled(Link)`
  color: White;
  font-weight: 100;
  text-decoration: none;
  font-size: 1.25rem;

  &:hover {
    color: inherit;
  }

  ${props => props.theme.media.tablet`
    display: none;
  `}
`

const HeaderLinkPages = styled.a`
  display: none

  ${props => props.theme.media.phone`
    color: White;
    display: block;
    font-size: 1.25rem;
    font-weight: 100;
    text-decoration: none;
  `}
`

const AboutLink = styled(Link)`
  color: white;
  font-weight: 100;
  text-decoration: none;
  font-size: 1.25rem;
`

const PageTitle = styled.h1`
  display: none;

  ${props => props.theme.media.smallTablet`
    display: block
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
        <PageTitle>
          {/*THESE ARE CONDITIONALLY RENDERED BASED ON MEDIA QUERIES!*/}
          <Link
            to="/"
            state={{
              noAnimation: true,
            }}
          >
            {siteTitle}
          </Link>
        </PageTitle>

        <HeaderLinkList>
            <HeaderSmallHomeLink
              className="header-small-home-link"
              to="/"
              state={{
                noAnimation: true,
              }}
            >
              Home
            </HeaderSmallHomeLink>
          {data.contentfulAuthor.linkList.links.map(data => {
            return (
              <li key={`header-${data.LinkType}`}>
                <HeaderLinkPages href={data.Link}>
                  {data.LinkType}
                </HeaderLinkPages>
              </li>
            )
          })}
            <AboutLink to="/about">
              About
            </AboutLink>
        </HeaderLinkList>
      </StyledHeader>
    )}
  />
)

export default Header
