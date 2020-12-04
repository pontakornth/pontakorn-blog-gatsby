import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={article.heroImage.fluid} />
    <div className={styles.previewBody}>
      <h3 className={styles.previewTitle}>
        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
      </h3>
      <small className={styles.date}>{article.publishDate}</small>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: article.description.childMarkdownRemark.html,
        }}
      />
      {article.tags &&
        article.tags.map(tag => (
          <Link to={`/tags/${tag}`} className={styles.tag} key={tag}>
            {tag}
          </Link>
        ))}
    </div>
  </div>
)
