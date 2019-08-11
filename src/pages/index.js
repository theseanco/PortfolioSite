/*
OPTIMIZE: : There is code repetition here, abstract this out into a component
*/

/*

TODO:

- Why are inline styles needed, e.g. IndexCategoryImage
- The AnimateBlur element is messy and could be turned into an overlay
- Make animations work selectively with page transitions and props
- Tweak the styles that are an issue:
  - Text sizes
  - Article page margins
  - Other stuff

*/

import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import theme from '../theme';

import SEO from '../components/seo';

// overall container
const FlexContainerIndex = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.evening};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
`;

// Images under the section cards
const IndexCategoryImage = styled(Img)`
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

// Links on top of the secion cards
const IndexCategoryLink = styled.button`
  align-items: center;
  background-color: rgba(0,0,0,0);
  border: none;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  h2 {
    font-size: 3rem;
  }
`;

// Overlay for animations
const IndexCategoryOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: absolute;
  transition: ${props => props.theme.animations.fadein} ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.sunset};
    opacity: 0.9;
    transition: ${props => props.theme.animations.fadein};
  }
`;

// Animation example
const blurFadeout = keyframes`
  0% {
    filter: blur(5px);
  }

  60% {
    filter: blur(5px);
  }

  100% {
    filter: blur(0px);
  }
`;

const CategoryContainerAnimated = styled.div`
  align-items: center;
  animation-duration: calc(${props => props.theme.animations.revealAnimation} + 1.5s);
  animation-fill-mode: forwards;

  animation-name: ${(props) => {
    if (props.noAnimation) return 'none';
    return blurFadeout;
  }};
  height: 100%;
  justify-content: center;
  margin: 1rem;
  position: relative;
  width: 90%;
`;

const TextOpacity = keyframes`
  0% {
    opacity: 1;
    z-index: 3;
  }

  99% {
    opacity: 0;
    z-index: 3;
  }

  100% {
    opacity: 0;
    z-index: -99;
  }
`;

const TextOpacitySoft = keyframes`
  0% {
    opacity: 0.9;
    z-index: 3;
  }

  99% {
    opacity: 0;
    z-index: 3;
  }

  100% {
    opacity: 0;
    z-index: -99;
  }
`;

// Intro text
const AnimateText = styled.div`
  align-items: center;
  animation-delay: 1s;
  animation-duration: ${props => props.theme.animations.revealAnimation};
  animation-fill-mode: forwards;
  animation-name: ${TextOpacity};
  display: ${(props) => {
    if (props.noAnimation) return 'none';
    return 'flex';
  }};
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  position: fixed;
  width: 100vw;
  z-index: 3;

  @supports (-ms-ime-align: auto) {
    animation-name: ${TextOpacitySoft};
    background: ${props => props.theme.colors.evening};
    background: linear-gradient(180deg, rgba(25,34,49,1) 13%, rgba(0,0,0,1) 100%); 
  }

  h1 {
    font-size: 5rem;
    font-weight: 500;
  }

  p {
    font-size: 2rem;
    font-weight: 100;
    line-height: 2.5rem;
    margin: 1rem;
    text-align: center;
  }
`;

const IndexPage = (props) => {
  const {
    contentfulHomepage: {
      homepageTitle,
      homepageSubtitle,
      categories,
      authorPage,
    },
  } = props.data;

  const doNotAnimate = props.location && props.location.state ? props.location.state.noAnimation : false;

  // console.log(props.location.state.noAnimation)
  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
          <AnimateText noAnimation={doNotAnimate}>
            <h1>Sean Cotterill</h1>
            <p>{homepageSubtitle}</p>
          </AnimateText>
          <FlexContainerIndex>
            {
            categories.map(data => (
              <CategoryContainerAnimated
                key={data.id}
                noAnimation={doNotAnimate}
              >
                <IndexCategoryImage style={{ position: 'absolute' }} fluid={data.categoryPicture.fluid} />
                <Link
                  to={`/${data.slug}`}
                  style={{
                    height: '100%',
                    width: '100%',
                    textDecoration: 'none',
                  }}
                  tabIndex={-1}
                >
                  <IndexCategoryOverlay>
                    <IndexCategoryLink tabIndex={0}>
                      <h2>
                        {' '}
                        {data.categoryName}
                        {' '}
                      </h2>
                    </IndexCategoryLink>
                  </IndexCategoryOverlay>
                </Link>
              </CategoryContainerAnimated>
            ))
          }

            <CategoryContainerAnimated
              key={authorPage.id}
              noAnimation={doNotAnimate}
            >
              <IndexCategoryImage style={{ position: 'absolute' }} fluid={authorPage.sectionCardPhoto.fluid} />
              <Link
                to={`/${authorPage.slug}`}
                style={{
                  height: '100%',
                  width: '100%',
                  textDecoration: 'none',
                }}
                tabIndex={-1}
              >
                <IndexCategoryOverlay>
                  <IndexCategoryLink tabIndex={0}>
                    <h2 key={authorPage.id}>
                    About
                    </h2>
                  </IndexCategoryLink>
                </IndexCategoryOverlay>
              </Link>
            </CategoryContainerAnimated>
          </FlexContainerIndex>
        </>
      </ThemeProvider>
    </>
  );
};

export const query = graphql`
  {
  contentfulHomepage {
    homepageTitle
    homepageSubtitle
    categories {
      categoryName
      id
      slug
      categoryPicture {
        id
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    authorPage {
      slug
      sectionCardPhoto {
        id
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
}
`;

export default IndexPage;
