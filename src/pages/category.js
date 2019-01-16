import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './categoryStyling.css'

const CategoryPage = ({
  data: {
    contentfulCategory: {
      categoryName,
      id,
      slug,
      works
    }
  }
}) => (
  <Layout>
  {
    console.log(works)
  }
    <SEO title={categoryName} />
    <div className="title">
      <h1>{categoryName}</h1>
    </div>
    <div className="grid-container">
    {
      //create a list of works
      works.map(work => {
        //available: work ID, Title, Slug, summary(.internal.content)
        return (
          <Link
            to={`/${slug}/${work.slug}`}
            style={{
            height: `100%`,
            width: `100%`,
            textDecoration: `none`
            }}
            >
            <div className="categoryImage">
            <Img fluid={work.featuredImage.fluid} />
            </div>
            </Link>
          )
      })
    }
    </div>
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
