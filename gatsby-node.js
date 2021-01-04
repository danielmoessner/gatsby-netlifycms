// const _ = require('lodash')
// const path = require('path')
// const { createFilePath } = require('gatsby-source-filesystem')
// const { fmImagesToRelative } = require('gatsby-remark-relative-images')

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   return graphql(`
//     {
//       allMarkdownRemark(limit: 1000) {
//         edges {
//           node {
//             id
//             frontmatter {
//               template
//               title
//             }
//             fields {
//               slug
//               contentType
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       result.errors.forEach(e => console.error(e.toString()))
//       return Promise.reject(result.errors)
//     }

//     const mdFiles = result.data.allMarkdownRemark.edges

//     const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')

//     _.each(contentTypes, (pages, contentType) => {
//       const pagesToCreate = pages.filter(page =>
//         // get pages with template field
//         _.get(page, `node.frontmatter.template`)
//       )
//       if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

//       console.log(`Creating ${pagesToCreate.length} ${contentType}`)

//       pagesToCreate.forEach((page, index) => {
//         const id = page.node.id
//         createPage({
//           // page slug set in md frontmatter
//           path: page.node.fields.slug,
//           component: path.resolve(
//             `src/templates/${String(page.node.frontmatter.template)}.js`
//           ),
//           // additional data can be passed via context
//           context: {
//             id
//           }
//         })
//       })
//     })
//   })
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   // convert frontmatter images
//   fmImagesToRelative(node)

//   // Create smart slugs
//   // https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-node.js
//   let slug
//   if (node.internal.type === 'MarkdownRemark') {
//     const fileNode = getNode(node.parent)
//     const parsedFilePath = path.parse(fileNode.relativePath)

//     if (_.get(node, 'frontmatter.slug')) {
//       slug = `/${node.frontmatter.slug.toLowerCase()}/`
//     } else if (
//       // home page gets root slug
//       parsedFilePath.name === 'home' &&
//       parsedFilePath.dir === 'pages'
//     ) {
//       slug = `/`
//     } else if (_.get(node, 'frontmatter.title')) {
//       slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
//         node.frontmatter.title
//       )}/`
//     } else if (parsedFilePath.dir === '') {
//       slug = `/${parsedFilePath.name}/`
//     } else {
//       slug = `/${parsedFilePath.dir}/`
//     }

//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })

//     // Add contentType to node.fields
//     createNodeField({
//       node,
//       name: 'contentType',
//       value: parsedFilePath.dir
//     })
//   }
// }

// // Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
// module.exports.resolvableExtensions = () => ['.json']

// const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     let slug = createFilePath({ node, getNode, basePath: `pages` })
//     slug = node.frontmatter.slug
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
// }

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = [
//     `type MarkdownRemark implements Node { frontmatter: Frontmatter }`,
//     `type Frontmatter {
//       # you may need to adapt this line depending on the node type and key
//       # that you want to create the relationship for
//       image: File @link(by: "image")
//     }`
//   ]
//   createTypes(typeDefs)
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create the animal pages
  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { collection: { eq: "animal" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
            id
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: 'wildtiere/' + node.frontmatter.slug,
      component: path.resolve(`./src/templates/animal.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.frontmatter.slug,
        id: node.id,
      },
    })
  })
}
