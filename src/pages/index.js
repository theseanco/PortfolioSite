/*
OPTIMIZE: : There is code repetition here, abstract this out into a component
*/

import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from '../components/seo'

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
        <div></div>
      )
    }

  return(
  <div>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div className={this.state.animateText}>
      <h1 style={{fontSize: '4rem', fontWeight: 500}}>Sean Cotterill</h1>
      <h2>{homepageSubtitle}</h2>
      {/*
        this.props.location.state.animated === null ? <div> No animation </div> : <div> Animation </div>
      */}
    </div>

    <div className="flex-container-index">
      {
        categories.map((data) => {
          return (
            <div
              className={this.state.animateBlur}
              key={data.id}
            >
              <Img className="index-category-image" style={{position: `absolute`}} fluid={data.categoryPicture.fluid} />
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
        className={this.state.animateBlur}
        key={authorPage.id}
      >
      <Img className="index-category-image" style={{position: `absolute`}} fluid={authorPage.sectionCardPhoto.fluid} />
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
