import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import styles from './about.module.css'
import SEO from '../components/seo'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [authorWhole] = get(this, 'props.data.allContentfulPerson.edges')
    const author = authorWhole.node

    return (
      <Layout location={this.props.location}>
        <SEO title={siteTitle} image={author.image} />
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h2 className="section-headline">About me</h2>
            <h3 className={styles.name}>{author.name}</h3> 
            <h3 className={styles.title}>{author.title}</h3>
            <p>
              {author.shortBio.shortBio}
            </p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          title
          shortBio {
              shortBio
          }
          image: image {
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
    }
  }
`
