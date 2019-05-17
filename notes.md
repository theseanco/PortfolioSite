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
        }    <Link to="/page-2/">Go to page 2</Link>

      }
    }
  }
}


Two queries to go within the work component. One to get the work info, and the other to get the parent category

query getWorkContents(
    $pageSlug: String,
    $parentSlug: String
  ){
    getWorkInfo: contentfulWork(slug: {eq: $pageSlug}) {
      id
      title
      featuredImage {
        id
      }
      description {
        id
        description
      }
      technologies
      link
    }
    getParentCategory: contentfulCategory(slug: {eq: $parentSlug}){
      id
      slug
      categoryName
    }
  }


Color Pallette: https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c

#011627 - Maastricht Blue
#FDFFFC - Baby Powder
#2EC4B6 - Maximum Blue Green
#E71D36 - Rose Madder
#FF9F1C - Crayola

These are given global variables by importing it within the global stylesheet.

I didn't like that one, so for now i'm going to stick to:

STORMY #494E6B
CLOUD #98878F
SUNSET #985E6D
EVENING #192231

Typography

Going to for theme-moraga

Removed the Layout component from around `index.js`, to remove the header and make the homepage 'special'

#### GraphQL Query for getting icons

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

A hack to get intro animation to work:

@keyframes opacityFadeout {
  0% {
    opacity: 1;
    z-index: 3
  }

  99% {
    opacity: 0;
    z-index: 3;
  }

  100% {
    opacity: 0;
    z-index: -99
  }
}

# 8th May 2019 todo:

- Clearly focusable work/link tabs
- PWA offline support, inc splash screen
- Icons at the bottom are too small at smaller screen sizes
- List of links in the header isn't accessible
- update deps
- Re-write overwritten styles which have been reset.
- Semantic markup
