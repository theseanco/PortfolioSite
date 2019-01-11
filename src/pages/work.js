import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = ({data}) => (
  <Layout>
  {console.log(data)}
    <SEO title="Page two" />
    <h1>Post</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

const query = graphql`
query getCategoryInfo($path: String){
  contentfulCategory(slug: {eq: $path}) {
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

export default SecondPage
