import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby';

const SEO = (props) => {
    const siteData = useStaticQuery(graphql`
    query SiteQuery {
        site {
            siteMetadata{
                title
                siteUrl
            }
        }
    }
    `)
    return (
        <>
        <Helmet>
            <meta property="og:title" content={props.title || siteData.site.siteMetadata.title} />
            <meta property="og:image" content={`${siteData.site.siteMetadata.siteUrl}${props.image.fixed}`} />
            <meta property="og:type" content="article" />
        </Helmet>
        </>
    )
}

export default SEO;