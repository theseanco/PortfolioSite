import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const WorkPage = ({data}) => (
  <Layout>
  {console.log(data)}
    <SEO title="Page two" />
    <h1>{data.getWorkInfo.title}</h1>
    {data.getWorkInfo.description.description}
    <ul>
      {
        data.getWorkInfo.technologies.map((data, index) => {
          return (
            <li key={index}>{data}</li>
          )
        })
      }
    </ul>
    <p>
      <a href={data.getWorkInfo.link}>Visit Site</a>
    </p>
    <p>
      <Link to={data.getParentCategory.slug}>
        Back to {data.getParentCategory.categoryName}
      </Link>
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
  query getWorkContents(
      $pageSlug: String,
      $parentSlug: String
    ){
      getWorkInfo: contentfulWork(slug: {eq: $pageSlug}) {
        id
        title
        featuredImage {
          id
        }
        description {
          id
          description
        }
        technologies
        link
      }
      getParentCategory: contentfulCategory(slug: {eq: $parentSlug}){
        id
        slug
        categoryName
      }
    }
`

export default WorkPage
