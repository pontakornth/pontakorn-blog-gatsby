import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import SEO from '../components/seo'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteUrl = get(this, 'props.data.site.siteMetadata.siteUrl')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const [coverImage] = get(this, 'props.data.allContentfulAsset.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <SEO title={siteTitle} image={coverImage.node} />
          <Hero data={coverImage} />
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulAsset(filter: {contentful_id: {eq: "7Ld9w3M1NhuB14o2pKSUfz"}, fluid: {}}) {
      edges {
        node {
          contentful_id
          description
          title
          fluid(
            maxWidth: 1180
            maxHeight: 480
            resizingBehavior: PAD
            background: "rgb:000000"
          ) {
            ...GatsbyContentfulFluid_withWebp
          }
          fixed(
            width: 1180
            background: "rgb:000000"
          ) {
            src
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
