/*
OPTIMIZE: : There is code repetition here, abstract this out into a component
*/

/*

TODO:

- Redo animation in styled-components
- Why are inline styles needed, e.g. IndexCategoryImage
- The AnimateBlur element is messy and could be turned into an overlay
- Make animations work selectively with page transitions and props

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
`

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

const HoverTitle = styled.h1`
  font-size: 4rem;
  font-weight: 500;
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
  z-index: 3
`


//DESTRUCTURE THIS.
class IndexPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      animateText: "doNotDisplay",
      animateBlur: "category-container",
      loading: true
    }
  }

  componentWillMount() {
    this.setState({loading: true})
  }

  componentDidMount() {
    this.setState({loading: false})
    const { state } = this.props.location;

    /*
      If state is null, this page has been loaded from a URL, so play the animation. If it is NOT null, it _CURRENTLY_ should not animate as it has been navigated to from within the site.
    */
    if (state === null) {
      this.setState({
      animateText: "title-splash-bg animate-title",
      animateBlur: "category-container animate-blur"
      });
    } else {
      this.setState({
      animateText: "doNotDisplay",
      animateBlur: "category-container"
      })
    }
  }

render() {

  const {
      contentfulHomepage: {
        homepageTitle,
        homepageSubtitle,
        categories,
        authorPage
      }
    } = this.props.data

    if(this.state.loading) {
      return(
        <ThemeProvider theme={theme}>
          <FlexContainerIndex/>
        </ThemeProvider>
      )
    }

  return(
    <>
    <ThemeProvider theme={theme}>
      <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <AnimateText>
          <HoverTitle>Sean Cotterill</HoverTitle>
          <h2>{homepageSubtitle}</h2>
        </AnimateText>
        <FlexContainerIndex>
          {
            categories.map((data) => {
              return (
                <CategoryContainerAnimated
                  key={data.id}
                >
                  <IndexCategoryImage style={{position: `absolute`}} fluid={data.categoryPicture.fluid} />
                  <Link
                    to={data.slug}
                    style={{
                      height: `100%`,
                      width: `100%`,
                      textDecoration: `none`
                    }}>
                    <IndexCategoryOverlay>
                      <IndexCategoryLink>
                        <h3> {data.categoryName} </h3>
                      </IndexCategoryLink>
                    </IndexCategoryOverlay>
                  </Link>
                </CategoryContainerAnimated>
              )
            })
          }

          <CategoryContainerAnimated
            key={authorPage.id}
          >
          <IndexCategoryImage style={{position: `absolute`}} fluid={authorPage.sectionCardPhoto.fluid} />
            <Link
              to={authorPage.slug}
              style={{
                      height: `100%`,
                      width: `100%`,
                      textDecoration: `none`
                    }}
            >
              <IndexCategoryOverlay>
                <IndexCategoryLink>
                  <h3 key={authorPage.id}>
                    About
                  </h3>
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
