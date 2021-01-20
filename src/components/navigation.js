import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Posts</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/about/">About</Link>
      </li>
      <li className={styles.navigationItem}>
        <a href="https://webring.wonderful.software#pontakorn.dev" title="วงแหวนเว็บ">
          <img
            className={styles.webring}
            alt="วงแหวนเว็บ"
            width="32"
            height="32"
            src="https://webring.wonderful.software/webring.black.svg"
          />
        </a>
      </li>
    </ul>
  </nav>
)
