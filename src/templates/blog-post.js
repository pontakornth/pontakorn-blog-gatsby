import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import SEO from '../components/seo'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'
import styles from '../components/blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const tags = post.tags

    return (
      <Layout location={this.props.location}>
        <main style={{ background: '#fff' }}>
          <SEO title={post.title} image={post.heroImage} />
          <header className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </header>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <ul className={styles.tagList}>
              {tags.map(tag => (
                <Link className="tag" to={`/tags/${tag}`} key={tag}>{tag}</Link>
              ))}
            </ul>
          </div>
        </main>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
        fixed(width: 1180) {
          src
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      tags
    }
  }
`
