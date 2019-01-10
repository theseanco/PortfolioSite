/*

Function taken from https://www.gatsbyjs.org/docs/creating-and-modifying-pages/

*/

var nodePath = require('path')
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = nodePath.resolve(`src/pages/post-lorem.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allContentfulCategory {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allContentfulCategory.edges.forEach(({ node }) => {
          const path =  `/${node.slug}`
          createPage({
            path,
            component: blogPostTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              path,
            },
          })
        })
      })
    )
  })
}
