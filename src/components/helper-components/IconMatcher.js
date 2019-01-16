import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'

//function to condense array of objects into _just_ an array for grabbing icon names, which will then be converted into icons later on at the render stage.
const forEachThing = (input) => {
  let newArray = [];
  input.forEach((data,index) => {
    newArray.push(data.title)
  });
  console.log(newArray)
}

const IconMatcher = (props) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulIcons {
          edges {
            node {
              iconList {
                id
                title
                file {
                  url
                }
              }
            }
          }
        }
      }
      `}
      render={data => (
        <div>
        {
          props.items.map(props => console.log(props))
        }
        Static Query Complete</div>
      )}
    />
)

export default IconMatcher
