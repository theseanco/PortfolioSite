import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const CategoryPage = ({data}) => (
  <Layout>
  {console.log(data)}
    <SEO title="Page two" />
    <h1>{data.contentfulCategory.categoryName}</h1>
    <ul>
    {
      //create a list of works
      data.contentfulCategory.works.map(work => {
        return (
          <li key={work.id}>
          <h3>{work.title}</h3>
          {work.summary.internal.content}
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
    categoryName
    works {
      id
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
