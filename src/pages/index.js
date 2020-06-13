import React from "react"
import { graphql, Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
            style={{display: 'inline-block', color: 'inherit'}}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4 style={{color: 'inherit'}}>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
              <Link
              to={node.fields.slug}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
                <h3
                style={{marginBottom: `${rhythm(1 / 4)}`, color: 'inherit'}}
                >
                {node.frontmatter.title}{" "}
                <span
                    style={{color: 'inherit'}}
                >
                    — {node.frontmatter.date}
                </span>
                </h3>
                <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`