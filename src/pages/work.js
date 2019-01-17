// OPTIMIZE: GET RID OF UNNECESSARILY QUERIED TECHNOLOGY VALUES
import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
// import IconMatcher from '../components/helper-components/IconMatcher'
import SEO from '../components/seo';

import './workStyling.css'

const WorkPage = ({data: {
  getParentCategory: {
    categoryName,
    slug
  },
  getWorkInfo: {
    description,
    featuredImage,
    link,
    githubLink,
    technologies,
    title,
    technologyIcons
  }
}}) => (
  <Layout>
    <SEO title={title} />
    <div className="work-grid-container">
      <div className="work-text-area">
        <h1>{title}</h1>
        <div className="work-description">
          <p>
            {description.description}
          </p>
        </div>
        <ul className="iconList">
        {/* Conditional rendering of icons */}
          {technologyIcons ? (
            technologyIcons.map(data => {
              return (
                <li>
                  <div className="icon">
                    <img src={`http://${data.file.url}`} />
                  </div>
                </li>
              )
            })
            ) : (null)}
        </ul>
        <p>
          <a href={link} target="_blank">Visit Site</a>
        </p>
        <p>
         {
           githubLink ? <a href={githubLink} target="_blank">Visit on GitHub</a> : null
         }
        </p>
        <p>
          <Link to={slug}>
            Back to {categoryName}
          </Link>
        </p>
        <Link to="/">Home</Link>
      </div>
      <div className="work-image-area">
        <Img fluid={featuredImage.fluid} />
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query getWorkContents(
      $pageSlug: String,
      $parentSlug: String
    ){
      getWorkInfo: contentfulWork(slug: {eq: $pageSlug}) {
        id
        title
        featuredImage {
          id
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        description {
          id
          description
        }
        technologies
        link
        githubLink
        technologyIcons {
          id
          title
          file {
            url
            fileName
            contentType
          }
        }
      }
      getParentCategory: contentfulCategory(slug: {eq: $parentSlug}){
        id
        slug
        categoryName
      }
    }
`

export default WorkPage
