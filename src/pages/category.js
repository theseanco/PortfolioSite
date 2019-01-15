import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

const CategoryPage = ({data}) => (
  <Layout>
    <SEO title="Page two" />
    <h1>{data.contentfulCategory.categoryName}</h1>
    <ul>
    {
      //create a list of works
      data.contentfulCategory.works.map(work => {
        return (
          <li key={work.id}>
          <Link to={`/${data.contentfulCategory.slug}/${work.slug}`}><h3>{work.title}</h3></Link>

          {
            work.summary.internal.content
          }
          <Img fluid={work.featuredImage.fluid} />
          </li>
          )
      })
    }
    </ul>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
query getCategoryInfo($pageSlug: String){
  contentfulCategory(slug: {eq: $pageSlug}) {
    id
    slug
    categoryName
    works {
      id
      slug
      title
      featuredImage {
        id
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      summary {
        internal {
          content
        }
      }
    }
  }
}
`


export default CategoryPage
