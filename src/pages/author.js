import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = ({data}) => (
  <Layout>
  {console.log(data)}
    <SEO title="Page two" />
    <h1>{data.contentfulAuthor.name}</h1>
    <h4>{data.contentfulAuthor.subtitle}</h4>
    <p>{data.contentfulAuthor.bodyText.bodyText}</p>
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
    <Link to="/">Go back to the homepage</Link>
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
      }
      bodyText {
        id
        bodyText
      }
    }
  }
`

export default SecondPage
