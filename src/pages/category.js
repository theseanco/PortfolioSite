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
import styled from 'styled-components'

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;

  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    margin-bottom: 1.5rem;
  }
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

const FadeOverlayGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: var(--fadein) ease-out;
  background-color: rgba(0, 0, 0, 0.65);

  &:hover {
    opacity: 0.9;
    transition: ${props => props.theme.animations.fadein};
    background-color: ${props => props.theme.colors.sunset};
  }
`

const LinkGrid = styled.div`
  height: 100%;
  width: 100%;
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 200;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
`

const HomeLink = styled(Link)`
  display: block;
  padding-top: 1rem;
`

const CategoryPage = ({
  data: {
    contentfulCategory: { categoryName, id, slug, works },
  },
}) => (
  <Layout>
    <SEO title={categoryName} />
    <TitleContainer>
      <h1>{categoryName}</h1>
    </TitleContainer>
    <GridContainer>
      {//create a list of works
      works.map(work => {
        //available: work ID, Title, Slug, summary(.internal.content)
        return (
          <WorkImageContainer key={work.id}>
            <WorkImage fluid={work.featuredImage.fluid} />
            <StyledLink to={`/${slug}/${work.slug}`}>
              <FadeOverlayGrid>
                <LinkGrid>
                  <h2>{work.title}</h2>
                  <p>{work.summary.internal.content}</p>
                </LinkGrid>
              </FadeOverlayGrid>
            </StyledLink>
          </WorkImageContainer>
        )
      })}
    </GridContainer>
    <HomeLink
      to="/"
      state={{
        noAnimation: true,
      }}
    >
      Home
    </HomeLink>
  </Layout>
)

export const query = graphql`
  query getCategoryInfo($pageSlug: String) {
    contentfulCategory(slug: { eq: $pageSlug }) {
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
