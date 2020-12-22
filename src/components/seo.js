import React, { useEffect } from 'react'
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
                    fixed(
                        width: 1180
                        background: "rgb:000000"
                    ) {
                        ...GatsbyContentfulFixed_withWebp
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
    const siteImage = () =>  props.image ? props.image.fixed.src : siteData.allContentfulAsset.edges[0].node.fixed.src
    const title = () => props.title || siteData.site.siteMetadata.title
    return (
        <>
        <Helmet>
            <meta property="og:title" content={title()} />
            <meta property="og:image" content={siteImage()} />
            <meta property="og:type" content="article" />
            <title>{title()}</title>
        </Helmet>
        </>
    )
}

export default SEO;