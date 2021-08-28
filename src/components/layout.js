import React from 'react'
import { Link } from 'gatsby'
import '../assets/base.css'
import '../assets/prism-theme.css'
import './base.css'
import Container from './container'
import Navigation from './navigation'
import Navbar from './Navbar'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
        <Navbar />
      <Container>
        <Navigation />
        {children}
      </Container>
      </>
    )
  }
}

export default Template
