const pagination = require('gatsby-awesome-pagination');
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const Tag = path.resolve('./src/templates/tag.js')
    const allTags = new Set()
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                  tags
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }




        const posts = result.data.allContentfulBlogPost.edges
        pagination.paginate({
          createPage,
          items: posts,
          itemsPerPage: 5,
          pathPrefix: '/posts' ,
          component: path.resolve('./src/templates/pagination.js')
        })
        posts.forEach((post, index) => {
          post.node.tags.forEach(tag => allTags.add(tag))
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
        allTags.forEach(tag => {
          createPage({
            path: `/tags/${tag}/`,
            component: Tag,
            context: {
              tag,
            }
          })
        })
      })
    )
  })
}
