import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby';

const SEO = (props) => {
    const siteData = useStaticQuery(graphql`
    query SiteQuery {
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
            siteMetadata{
                title
                siteUrl
            }
        }
    }
    `)
    const siteImage =  props.image ? props.image.fixed.src : siteData.allContentfulAsset.edge.node.fixed.src
    const title = props.title || siteData.site.siteMetadata.title
    return (
        <>
        <Helmet>
            <meta property="og:title" content={title} />
            <meta property="og:image" content={siteImage} />
            <meta property="og:type" content="article" />
            <title>{title}</title>
        </Helmet>
        </>
    )
}

export default SEO;