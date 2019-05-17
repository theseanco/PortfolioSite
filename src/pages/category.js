/*
 * TODO:
 * 
 * - Semantic components
 *
 *
 */

import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './categoryStyling.css'

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4em;
  
  ${props => props.theme.media.tablet`
     grid-template-columns: 1fr 1fr;
  `}
`

const WorkImageContainer = styled.div`
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`

const WorkImage = styled(Img)`  
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  text-decoration: none;
`


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
    <SEO title={categoryName} />
    <TitleContainer>
      <h1>{categoryName}</h1>
    </TitleContainer>
    <GridContainer>
      {
        //create a list of works
        works.map(work => {
          //available: work ID, Title, Slug, summary(.internal.content)
          return (
            <WorkImageContainer key={work.id}>
            <WorkImage fluid={work.featuredImage.fluid} />
            <StyledLink
              to={`/${slug}/${work.slug}`}
              >
              <div className="fade-overlay-grid">
                <div className="link-grid">
                <h3>{work.title}</h3>
                <p>{work.summary.internal.content}</p>
                </div>
              </div>
              </StyledLink>
              </WorkImageContainer>
            )
        })
      }
    </GridContainer>
    <div className="category-home">
      <Link to="/"
        state={{
          noAnimation: true
        }}
      >Home</Link>
    </div>
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
        file {
          url
        }
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
