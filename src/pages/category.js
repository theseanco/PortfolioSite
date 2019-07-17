/*
 * TODO:
 *
 * - Semantic components
 *
 *
 */


import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100%;

  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    margin-bottom: 1.5rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 4em;
  grid-template-columns: 1fr;

  ${props => props.theme.media.tablet`
     grid-template-columns: 1fr 1fr;
  `}
`;

const WorkImageContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
`;

const WorkImage = styled(Img)`
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

const StyledLink = styled(Link)`
  height: 100%;
  text-decoration: none;
  width: 100%;
`;

const FadeOverlayGrid = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: ${props => props.theme.animations.fadein} ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.sunset};
    opacity: 0.9;
    transition: ${props => props.theme.animations.fadein};
  }
`;

const LinkGrid = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 10%;
  text-align: center;
  width: 100%;

  h2 {
    font-size: 2.5rem;
    font-weight: 200;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5rem;
  }
`;

const HomeLink = styled(Link)`
  border: 1px ${props => props.theme.colors.blanchedAlmond} solid;
  border-radius: 5px;
  color: ${props => props.theme.colors.blanchedAlmond};
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 2rem;
  transition: .1s ease-in-out;
  width: auto;

  &:hover, &:active {
    background: ${props => props.theme.colors.blanchedAlmond};
    color: ${props => props.theme.colors.evening};
    text-decoration: none;
  }
`;

const CategoryPage = ({
  data: {
    contentfulCategory: {
      categoryName, id, slug, works,
    },
  },
}) => (
  <Layout>
    <SEO title={categoryName} />
    <TitleContainer>
      <h1>{categoryName}</h1>
    </TitleContainer>
    <GridContainer>
      {// create a list of works
      works.map(work =>
        // available: work ID, Title, Slug, summary(.internal.content)
        (
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
        ))}
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
);

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
`;

export default CategoryPage;
