/*
OPTIMIZE: : There is code repetition here, abstract this out into a component
*/

/*

TODO:

- Redo animation in styled-components
- Why are inline styles needed, e.g. IndexCategoryImage

*/

import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import theme from '../theme.js';
import styled, { ThemeProvider } from 'styled-components';

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
        <div className={this.state.animateText}>
          <HoverTitle>Sean Cotterill</HoverTitle>
          <h2>{homepageSubtitle}</h2>
        </div>
        <FlexContainerIndex>
          {
            categories.map((data) => {
              return (
                <div
                  className={this.state.animateBlur}
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
                </div>
              )
            })
          }

          <div
            className={this.state.animateBlur}
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
          </div>
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
