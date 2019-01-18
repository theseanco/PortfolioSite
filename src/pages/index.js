/*
OPTIMIZE: : There is code repetition here, abstract this out into a component
*/

import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'

//import more typography things. Necessary as I am loading from outside of the layout
import { TypographyStyle, GoogleFont } from 'react-typography';

//Typography JS Things
import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'

//override styles
moragaTheme.overrideThemeStyles = (options) => ({
  'h1,h2,h3': {
    Color: 'BlanchedAlmond',
    textAlign: 'center'
  },
  'h2': {
    textAlign: 'center'
  },
  'h3': {
    fontSize: '2rem'
  },
  'p' : {
    Color: 'BlanchedAlmond',
  }
})

const typography = new Typography(moragaTheme)

//DESTRUCTURE THIS.
class IndexPage extends React.Component {



  componentDidMount() {

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

  const { state } = this.props.location;

  let animateText, animateBlur;
  /*
    If state is null, this page has been loaded from a URL, so play the animation. If it is NOT null, it _CURRENTLY_ should not animate as it has been navigated to from within the site.
  */
  if (state === null) {
    animateText = "title-splash-bg animate-title"
    animateBlur = "category-container animate-blur"
  } else {
    animateText = "doNotDisplay"
    animateBlur = "category-container"
  }

  return(
  <div>
  <TypographyStyle typography={typography} />
  <GoogleFont typography={typography} />

    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div className={animateText}>
      <h1 style={{fontSize: '4rem', fontWeight: 500}}>Sean Cotterill</h1>
      <h2>{homepageSubtitle}</h2>
      {/*
        this.props.location.state.animated === null ? <div> No animation </div> : <div> Animation </div>
      */}
    </div>

    <div className="flex-container">
      {
        categories.map((data) => {
          return (
            <div
              className={animateBlur}
              key={data.id}
              style={{backgroundImage: `url(http:${data.categoryPicture.file.url})`}}
            >
              <Link
                to={data.slug}
                style={{
                  height: `100%`,
                  width: `100%`,
                  textDecoration: `none`
                }}>
                <div className="fade-overlay">
                  <div className="link">
                    <h3> {data.categoryName} </h3>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }

      <div
        className={animateBlur}
        key={authorPage.id}
        style={{backgroundImage:
        `url(http:${authorPage.sectionCardPhoto.file.url})`}}
      >
        <Link
          to={authorPage.slug}
          style={{
                  height: `100%`,
                  width: `100%`,
                  textDecoration: `none`
                }}
        >
          <div className="fade-overlay">
            <div className="link">
              <h3 key={authorPage.id} className="about">
                About
              </h3>
            </div>
          </div>
          </Link>
      </div>
    </div>
    </div>
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
        file {
          url
        }
      }
    }
    authorPage {
      slug
      sectionCardPhoto {
        id
        file {
          url
        }
      }
    }
  }
}
`

export default IndexPage
