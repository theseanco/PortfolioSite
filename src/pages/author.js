import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const AuthorGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-areas:
  "authorImage"
  "authorText";

  ${props => props.theme.media.tablet`
    grid-template-columns: 2fr 1.75fr;
    grid-template-areas: "authorText authorImage"
  `}
`

const AuthorDescription = styled.section`
  color: BlanchedAlmond;
  font-weight: 200;
  line-height: 1.4rem;

  p {
    margin-bottom: 1.5rem;
  }
`

const AuthorTextArea = styled.article`
  grid-area: authorText;

  h1 {
    font-weight: 200;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`

const AuthorImageArea = styled.picture`
  grid-area: authorImage
`

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = ({data}) => (
  <Layout>
    <SEO title="About" />
    <AuthorGrid>
      <AuthorTextArea>
        <h1>{data.contentfulAuthor.name}</h1>
        <AuthorDescription>
          <div dangerouslySetInnerHTML={{
            __html: data.contentfulAuthor.bodyText.childMarkdownRemark.html
          }}/>
        </AuthorDescription>
        <footer>
          <Link to="/">Home</Link>
        </footer>
      </AuthorTextArea>
      <AuthorImageArea>
        <Img fluid={data.contentfulAuthor.headshot.fluid} />
      </AuthorImageArea>
    </AuthorGrid>
  </Layout>
)

export const query = graphql`
  {
    contentfulAuthor {
      id
      name
      linkList{
        id
        links {
          Link
          LinkType
        }
      }
      slug
      headshot {
        id
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      bodyText {
        id
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default SecondPage
