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
    const metas = [
        {
            property: 'og:title',
            content: props.title || siteData.site.siteMetadata.title
        },
        {
            property: 'og:image',
            content: `${siteData.site.siteMetadata.siteUrl}${props.image.fixed}`
        },
        {
            property: 'og:type',
            content: 'article'
        }
    ] 
    const title = props.title || siteData.site.siteMetadata.title
    return (
        <>
        <Helmet metas={metas} title={title} />
        {props.children}
        </>
    )
}

export default SEO;