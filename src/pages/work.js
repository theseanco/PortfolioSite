import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';

const WorkGridContainer = styled.main`
  display: grid;
  grid-gap: 2em;
  grid-template-areas:
  "workImage"
  "workText";

  ${props => props.theme.media.tablet`
    grid-template-columns: 1fr 1fr;
    grid-template-columns: 2fr 1.75fr;
    grid-template-areas: "workText workImage"
  `}

  ${props => props.theme.media.desktop`
    margin: 0 2rem;
  `}
`

const WorkArticle = styled.article`
  grid-area: workText

  h1 {
    text-align: center;
  }

  ${props => props.theme.media.tablet`
    h1 {
      text-align: left;
    }
  `}
`

const ExternalLinks = styled.div`
  display: flex;

  a {
    margin-right: 2rem;
    margin-bottom: 0.5rem;
  }
`

const WorkDescription = styled.section`
  color: BlanchedAlmond;
  font-weight: 200;
`

const WorkTextContainer = styled.div`
  blockquote {
    margin-right: 1.56rem;
    padding-left: 1.17rem;
    margin-bottom: 1.56rem;
    color: hsla(0,0%,0%,0.6);
    border-left: 0.39rem solid hsla(0,0%,0%,0.13);

    p {
      font-size: 1.4rem;
      line-height: 1.56rem;
    }
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 1.56rem;
    margin-block-start: 1rem;
    line-height: 1.56rem;
    margin-block-end: 1rem;
  }
`

const IconListNew = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 50px));
  grid-row-gap: 1rem;
  margin-bottom: 1rem;

  ${props => props.theme.media.tablet`
  grid-template-columns: repeat(auto-fit, minmax(70px, 70px));
  grid-row-gap: 1rem;
  `}
`

const Icon = styled.img`
  height: 35px;
  width: 35px;

  ${props => props.theme.media.tablet`
    height: 50px;
    width: 50px;
  `}
`

const InternalLinks = styled.ul`
  li {
    margin-top: 0.5rem
  }
`

const WorkImage = styled.picture`
  grid-area: workImage
`

const WorkTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 1.1;
  margin-bottom: 1.56rem;
`

const BuiltWith = styled.p`
  margin-bottom: 1rem;
`

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
    <WorkGridContainer>
      <WorkArticle>
        <header>
          <WorkTitle>{title}</WorkTitle>
          <ExternalLinks>
            {
              link ? <a href={link} target="_blank" rel="noopener noreferrer" >Visit Site</a> : null
            }
            {
              githubLink ? <a href={githubLink}  target="_blank" rel="noopener noreferrer">GitHub Repo</a> : null
            }
          </ExternalLinks>
        </header>
        <WorkDescription>
          <WorkTextContainer dangerouslySetInnerHTML={{
            __html: description.childMarkdownRemark.html
          }} / >
        </WorkDescription>
        <footer>
          <BuiltWith>Built using:</BuiltWith>
          <IconListNew>
          {/* Conditional rendering of icons */}
            {technologyIcons ? (
              technologyIcons.map(data => {
                return (
                  <li key={data.id}>
                    <Icon src={`https://${data.file.url}`} alt={data.title} />
                  </li>
                )
              })
              ) : (null)}
          </IconListNew>
          <InternalLinks>
            <li>
              <Link to={`/${slug}`}>
                Back to {categoryName}
              </Link>
            </li>
            <li>
              <Link to="/"
                state={{
                  noAnimation: true
                }}
              >Home</Link>
            </li>
          </InternalLinks>
        </footer>
      </WorkArticle>
      <WorkImage>
        <Img fluid={featuredImage.fluid} />
      </WorkImage>
    </WorkGridContainer>
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
          childMarkdownRemark {
            html
          }
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
