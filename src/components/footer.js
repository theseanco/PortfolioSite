import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Footer = styled.footer`
  color: ${props => props.theme.colors.newColor}
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
        <Footer className="page-footer">
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
