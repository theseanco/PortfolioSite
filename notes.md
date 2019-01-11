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

Query for grabbing all slugs

Old slug generation function

result.data.allContentfulCategory.edges.forEach(({ node }) => {
          const path = node.slug
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

Query from inside Category.js to get all posts in that categoryPath

query getCategoryInfo($categoryPath: String){
  contentfulCategory(slug: {eq: $categoryPath}) {
    id
    categoryName
    works {
      title
      summary {
        internal {
          content
        }
      }
    }
  }
}


And a query to try to get the images for use in a fluid divo

query getCategoryInfo($categoryPath: String){
  contentfulCategory(slug: {eq: $categoryPath}) {
    id
    categoryName
    works {
      title
      featuredImage {
        id
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      summary {
        internal {
          content
        }
      }
    }
  }
}