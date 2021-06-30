import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from './pagination.module.css'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const { pageContext } = this.props;
    const { previousPagePath, nextPagePath } = pageContext;

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Blog</div>
          <div className="wrapper">
            <h2 className="section-headline">Articles</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            <div className="flex justify-between">
              {previousPagePath ? <Link className="button" to={previousPagePath}>ก่อนหน้า</Link> : <div className="w-2"></div>}
              {nextPagePath ? <Link className="button" to={nextPagePath}>ถัดไป</Link>: <div className="w-3"></div>}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
        sort: { fields: [publishDate], order: DESC }
        skip: $skip
        limit: $limit
      ) {
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
  }
`
