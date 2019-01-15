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
  },
  'p' : {
    Color: 'BlanchedAlmond',
  }
})

const typography = new Typography(moragaTheme)

const IndexPage = ({ data }) => (
  <div>
  {
    console.log(data)
  }

  <TypographyStyle typography={typography} />

  <GoogleFont typography={typography} />
  {
    console.log(data)
  }
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="titleSplash">
      <h1 style={{fontSize: '4rem', fontWeight: 500}}>{data.contentfulHomepage.homepageTitle}</h1>
      <h2>{data.contentfulHomepage.homepageSubtitle}</h2>
    </div>
    <div className="categories">
      {
        data.contentfulHomepage.categories.map((data) => {
          return (
            <div key={data.id} className={`data-${data.slug}`}>
              <p>
                <Link to={data.slug}>{data.categoryName}</Link>
              </p>
            </div>
          )
        })
      }
      <p key={data.contentfulHomepage.authorPage.id} className="about">
        <Link to={data.contentfulHomepage.authorPage.slug}>
          About Me
        </Link>
      </p>
    </div>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
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
    }
    authorPage {
      slug
    }
  }
}
`

export default IndexPage
