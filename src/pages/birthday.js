import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import './birthday.css';

const BirthdayPage = ({ data }) => {
  console.log(data)
  return (
    <div>
      <div className="toonCenterContainer">
        <p className="toonBody">{data.allContentfulBirthday.edges[0].node.body}</p>
      </div>
    </div>
  )
}

export const query = graphql`
{
  allContentfulBirthday {
    edges {
      node {
        id
        title
        body
        image {
          id
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`

export default BirthdayPage
