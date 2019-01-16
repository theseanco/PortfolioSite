/*
TODO: There is code repetition here, abstract this out into a component
*/

import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
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
const IndexPage = ({
  //destructure data on input
  data: {
    contentfulHomepage: {
      homepageTitle,
      homepageSubtitle,
      categories,
      authorPage
    }
  }
}) => (
  <div>
  {
    console.log(categories)
  }

  <TypographyStyle typography={typography} />
  <GoogleFont typography={typography} />

    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="titleSplash">
      <h1 style={{fontSize: '4rem', fontWeight: 500}}>{homepageTitle}</h1>
      <h2>{homepageSubtitle}</h2>
    </div>
    <div className="flex-container">
      {
        categories.map((data) => {
          return (
            <div
              className="categoryContainer"
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
        className="categoryContainer"
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
