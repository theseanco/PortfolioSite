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
          <p key={data.id}><Link to={data.slug}>{data.categoryName}</Link></p>
        )
      })
    }
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
  </Layout>
)

export const query = graphql`
{
  contentfulHomepage {
    homepageTitle
    categories {
      categoryName
      id
      slug
    }
  }
}
`

export default IndexPage
