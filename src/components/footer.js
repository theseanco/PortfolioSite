import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

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
          <div className="footer-info">Sean Cotterill, 2019</div>
          <ul className="footer-icons">
              <span style={{ marginRight: `10px`, color: `White` }}>
              Created using:
            </span>
            {data.builtIcons.technologyIcons.map(data => {
              return (
                <li key={data.id} className="footer-icon">
                  <div className="footer-icon" key={data.id}>
                    <img src={`https://${data.file.url}`} alt={data.title} />
                  </div>
                </li>
              )
            })}
          </ul>
        </Footer>
      </>
    )}
  />
)

export default PageFooter
