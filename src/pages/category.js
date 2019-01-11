import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const CategoryPage = ({data}) => (
  <Layout>
  {console.log(data)}
    <SEO title="Page two" />
    <h1>Category</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
query getCategoryInfo($categoryPath: String){
  contentfulCategory(slug: {eq: $categoryPath}) {
    id
    categoryName
    works {
      title
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
