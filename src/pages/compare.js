import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout_wide"
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import Vote from "../components/vote"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';






const Compare = d => {

  let tools = d.data.allToolsYaml.nodes;

  const [toolsFiltered, setToolsFiltered] = useState(tools)
  const [showProprietary, setShowProprietary] = useState(false)
  const filterTools = showProprietary => {
    setShowProprietary(!showProprietary)
    console.log(showProprietary)
    tools = tools.filter(t => {
      if (showProprietary) {
        return true
      } else {
        return t.license !== "proprietary"
      }
    })
    setToolsFiltered(tools)
  }

  const heading = ["Votes", "Tool", "Category", "Type", "Tags", "License"]
  heading.sort(function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  });

  return (
    <Layout>
      <Container fixed>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
          Compare {tools.length} Analysis Tools
        </Typography>

        <Box style={{ backgroundColor: "#d3d3d3 " }} p={4}>
          <input
            onChange={() => filterTools(showProprietary)}
            type="checkbox"
            id="showproprietary"
            name="showproprietary"
            value="true"
          ></input>
          <label  htmlFor="showproprietary">
            Hide proprietary tools
          </label>

        </Box>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {heading.map((heading) => (
                  <TableCell align="center" style={{ fontWeight: 800 }} key={heading}>{heading}</TableCell>

                ))}
              </TableRow>

              {/* filter */}
            </TableHead>

            <TableBody>
              {toolsFiltered.map(tool => (
                <TableRow>
                  <TableCell align="center">{tool.categories.join(", ")}</TableCell>
                  <TableCell align="center">{tool.license}</TableCell>
                  <TableCell align="center">
                    <ul>
                      {tool.tags &&
                        tool.tags.slice(0, 3).map(tag => (
                          <li
                            key={`${tool.fields.slug}${tag}`}
                          >
                            <a href={"/tag/" + tag}>
                              <Box component="span" m={1} color="black" bgcolor="#d3d3d3" p={1} px={2}>
                                {tag}
                              </Box>
                            </a>
                          </li>
                        ))}
                      {tool.tags.length > 3 && (
                        <a href={tool.fields.slug}>
                          <Box component="span" m={1} color="black" bgcolor="#d3d3d3" p={1} px={2}>
                            more...
                          </Box>
                        </a>
                      )}
                    </ul>
                  </TableCell>

                  <TableCell align="center">{tool.types.join(", ")}</TableCell>

                  <TableCell align="center">
                    <Link to={tool.fields.slug} style={{ textDecoration: 'underline' }}>
                      {tool.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Vote k={tool.children[0].key} sum={tool.children[0].sum} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    allToolsYaml {
      nodes {
        categories
        deprecated
        discussion
        license
        name
        tags
        types
        fields {
          slug
          githubStats {
            stargazers_count
          }
        }
        children {
          ... on Votes {
            sum
            downVotes
            upVotes
            key
          }
        }
      }
    }
  }
`
export default Compare