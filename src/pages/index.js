import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
  {
    console.log(data)
  }
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>{data.contentfulHomepage.homepageTitle}</h1>
    {
      data.contentfulHomepage.categories.map((data) => {
        return (
          <p>{data.categoryName}</p>
        )
      })
    }
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const query = graphql`
{
  contentfulHomepage {
    homepageTitle
    categories {
      categoryName
    }
  }
}
`

export default IndexPage
