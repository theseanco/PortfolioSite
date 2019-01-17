import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import './authorStyling.css'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = ({data}) => (
  <Layout>
  {console.log(data)}
    <SEO title="Page two" />
    <div className="author-grid-container">
      <div className="author-text-area">
        <h1>{data.contentfulAuthor.name}</h1>
        <h3>{data.contentfulAuthor.subtitle}</h3>
        <div className="author-description">
          <p>{data.contentfulAuthor.bodyText.bodyText}</p>
        </div>
        <ul>
          {
            data.contentfulAuthor.linkList.links.map(data => {
              return (
                <li key={data.LinkType}>
                  <a href={data.Link}>
                    {data.LinkType}
                  </a>
                </li>
              )
            })
          }
        </ul>
        <Link to="/">Home</Link>
      </div>
      <div className="author-image-area">
        <Img fluid={data.contentfulAuthor.headshot.fluid} />
      </div>
    </div>

  </Layout>
)

export const query = graphql`
  {
    contentfulAuthor {
      id
      name
      subtitle
      linkList{
        id
        links {
          Link
          LinkType
        }
      }
      slug
      headshot {
        id
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      bodyText {
        id
        bodyText
      }
    }
  }
`

export default SecondPage
