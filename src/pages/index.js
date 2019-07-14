/*
OPTIMIZE: : There is code repetition here, abstract this out into a component
*/

/*

TODO:

- Redo animation in styled-components
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
import theme from '../theme.js';
import styled, { ThemeProvider, keyframes } from 'styled-components';

import SEO from '../components/seo';

// overall container
const FlexContainerIndex = styled.div`
  background-color: ${props => props.theme.colors.evening};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

// Images under the section cards
const IndexCategoryImage = styled(Img)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
`

// Links on top of the secion cards
const IndexCategoryLink = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 3rem;
  }
`

// Overlay for animations
const IndexCategoryOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  transition: var(--fadein) ease-out;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: ${props => props.theme.colors.sunset};
    opacity: 0.9;
    transition: ${props => props.theme.animations.fadein} ease-in;
  }
`

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
`

const CategoryContainerAnimated = styled.div`
  animation-duration: calc(${props => props.theme.animations.revealAnimation} + 1.5s);
  animation-name: ${props => {
    if (props.noAnimation) return 'none'
    return blurFadeout;
  }};
  animation-fill-mode: forwards;

  height: 100%;
  margin: 1rem;
  width: 90%;
  align-items: center;
  justify-content: center;
  position: relative;
`

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
`

// Intro text
const AnimateText = styled.div`
  animation-duration: ${props => props.theme.animations.revealAnimation};
  animation-name: ${TextOpacity};
  animation-fill-mode: forwards;
  animation-delay: 1s;
  position: fixed;
  display: ${props => {
    if (props.noAnimation) return 'none';
    return 'flex'
  }};
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  z-index: 3;

  h1 {
    font-weight: 500;
    font-size: 5rem;
  }

  p {
    font-size: 2rem;
    font-weight: 100;
  }
`

const IndexPage = (props) => {
  const {
      contentfulHomepage: {
        homepageTitle,
        homepageSubtitle,
        categories,
        authorPage
      }
    } = props.data

    const doNotAnimate = props.location && props.location.state ? props.location.state.noAnimation : false

    // console.log(props.location.state.noAnimation)
  return(
    <>
    <ThemeProvider theme={theme}>
      <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <AnimateText noAnimation={doNotAnimate}>
          <h1>Sean Cotterill</h1>
          <p>{homepageSubtitle}</p>
        </AnimateText>
        <FlexContainerIndex>
          {
            categories.map((data) => {
              return (
                <CategoryContainerAnimated
                  key={data.id}
                  noAnimation={doNotAnimate}
                >
                  <IndexCategoryImage style={{position: `absolute`}} fluid={data.categoryPicture.fluid} />
                  <Link
                    to={`/${data.slug}`}
                    style={{
                      height: `100%`,
                      width: `100%`,
                      textDecoration: `none`
                    }}>
                    <IndexCategoryOverlay>
                      <IndexCategoryLink>
                        <h2> {data.categoryName} </h2>
                      </IndexCategoryLink>
                    </IndexCategoryOverlay>
                  </Link>
                </CategoryContainerAnimated>
              )
            })
          }

          <CategoryContainerAnimated
            key={authorPage.id}
            noAnimation={doNotAnimate}
          >
          <IndexCategoryImage style={{position: `absolute`}} fluid={authorPage.sectionCardPhoto.fluid} />
            <Link
              to={`/${authorPage.slug}`}
              style={{
                      height: `100%`,
                      width: `100%`,
                      textDecoration: `none`
                    }}
            >
              <IndexCategoryOverlay>
                <IndexCategoryLink>
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
  )
}

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
`

export default IndexPage
