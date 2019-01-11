/*

Function taken from https://www.gatsbyjs.org/docs/creating-and-modifying-pages/

*/

var nodePath = require('path')
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const categoryComponent = nodePath.resolve(`src/pages/category.js`)
    const authorComponent = nodePath.resolve(`src/pages/author.js`)
    const workComponent = nodePath.resolve(`src/pages/work.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
        {
          allContentfulHomepage {
            edges {
              node {
                categories {
                  slug
                  works {
                    slug
                  }
                }
                authorPage {
                  slug
                }
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
        result.data.allContentfulHomepage.edges.forEach(({ node }) => {
          //Handle creating the author page
          const authorPath = node.authorPage.slug;
          createPage({
            path: authorPath,
            component: authorComponent,
            context: {
              pageSlug: authorPath
            }
          })

          node.categories.forEach(category => {
            console.log(category)
            //path of category tree
            const categoryPath = category.slug;
            //generate page for categories
            createPage({
              path: categoryPath,
              component: categoryComponent,
              context: {
                pageSlug: categoryPath
              }
            })
            category.works.forEach(work => {
              //path of work tree
              const workPath = work.slug;
              const combinedPath = `${categoryPath}/${workPath}`
              createPage({
                path: combinedPath,
                component: workComponent,
                context: {
                  //This is given as the workPath so that a graphQL query can be lodged against it./
                  pageSlug: workPath,
                  //This is also given the parent path to assist in navigation
                  parentSlug: categoryPath
                }
              })
            })
          })
        })
      })
    )
  })
}
