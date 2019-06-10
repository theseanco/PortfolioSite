import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const Footer = ({ data }) => (
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
        <footer className="page-footer">
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
        </footer>
      </>
    )}
  />
)

export default Footer
