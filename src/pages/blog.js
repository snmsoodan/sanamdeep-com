import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCount, setFilterCount] = useState(data.posts.totalCount);
  const [filteredPosts, setFilteredPosts] = useState(data.posts.edges);

  const handleChange = event => {
    setSearchTerm(event.target.value.toString());
  }

  const filterPosts = () => {
    let filteredData = data.posts.edges.filter(item => item.node.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPosts(filteredData);
  }

  useEffect(() => {
    filterPosts()
  }, [searchTerm])

  useEffect(() => {
    setFilterCount(filteredPosts.length);
  }, [filteredPosts])

  return (
    <Layout>
      <div>
        <h2
            style={{display: 'inline-block', color: 'inherit'}}
        >
          Articles
        </h2>
        <div className="search-container">
            <input
              className="search"
              type="text"
              name="searchTerm"
              value={searchTerm}
              placeholder="Type here to filter posts..."
              onChange={(e) => handleChange(e)}
            />
          <div className="filter-count">{filterCount}</div>
        </div>
        {filteredPosts.map(({ node }) => (
          <div key={node.id} className='blog'>
              <Link
              to={node.fields.slug}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
                <h3
                style={{marginBottom: `${rhythm(1 / 4)}`, color: 'inherit'}}
                >
                {node.frontmatter.title}
                <p className='blog-date'>{node.frontmatter.date}</p>
                </h3>
                <p>{node.excerpt}</p>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
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