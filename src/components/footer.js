/*
 *   todo:
 *   - That wierd span that is in the wrong place next to the list
 *   - Rest of the styled-components
 *   - Is list of imgs accessible?
 *   - ***CSS RESET!!!*** It's partially implemented in Layout but not working fully
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

// Overall footer conatainer
const Footer = styled.footer`
  align-items: center;
  border-top: 2px solid ${props => props.theme.colors.stormy};
  display: flex;
  font-weight: 100;
  font-size: 1em;
  height: 3rem;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 1em 0;

  /* Uses media queries for desktop styling */
  ${props => props.theme.media.desktop`
		align-items: center;
		font-size: 1em;
		height: 3rem;
		justify-content: space-between;
		padding: 1em 2em;
	`}
`

// Display my name and date
const FooterInfo = styled.div`
  display: none;

  ${props => props.theme.media.desktop`
    color: White;
    display: block;
  `}
`

const FooterLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`


// Styling for list of project build icons
const FooterIcons = styled.ul`
  
  display: flex;
  list-style-type: none;
  flex-direction: row;

  li:not(:last-child) {
    margin-right: 10px;
  }
`

// The build icons themselves
const FooterIcon = styled.img`
  height: 15px;
  margin-bottom: 0px;
  width: 15px;

  ${props => props.theme.media.tablet`
    height: 25px;
    width: 25px;
  `}
`

const CreatedUsing = styled.span`
  color: White
`

const PageFooter = ({ data }) => (
  <StaticQuery
    query={graphql`
      {
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
        <Footer>
          <FooterInfo>Sean Cotterill, 2019</FooterInfo>
          <FooterLeftContainer>
            <CreatedUsing>
              Created using:
            </CreatedUsing>
            <FooterIcons>
              {data.builtIcons.technologyIcons.map(data => {
                return (
                  <li key={data.id}>
                    <FooterIcon
                      src={`https://${data.file.url}`}
                      alt={data.title}
                    />
                  </li>
                )
              })}
            </FooterIcons>
          </FooterLeftContainer>
        </Footer>
      </>
    )}
  />
)

export default PageFooter
