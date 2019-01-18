import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import './authorStyling.css'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = ({data}) => (
  <Layout>
    <SEO title="About" />
    <div className="author-grid-container">
      <div className="author-text-area">
        <h1>{data.contentfulAuthor.name}</h1>
        <div className="author-description">
          <p dangerouslySetInnerHTML={{
            __html: data.contentfulAuthor.bodyText.childMarkdownRemark.html
          }}/>
        </div>
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
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default SecondPage
