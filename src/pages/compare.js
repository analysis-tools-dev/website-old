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
        <h1>Compare {tools.length} Analysis Tools</h1>

        <div >
          <input
            onChange={() => filterTools(showProprietary)}
            type="checkbox"
            id="showproprietary"
            name="showproprietary"
            value="true"
          ></input>
          <label htmlFor="showproprietary">
            Hide proprietary tools
          </label>
        </div>

        <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {heading.map((heading) => (
                <TableCell  align ="center" key={heading}>{heading}</TableCell>

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
                            <span >
                              {tag}
                            </span>
                          </a>
                        </li>
                      ))}
                    {tool.tags.length > 3 && (
                      <a href={tool.fields.slug}>
                        <span>
                          more...
                        </span>
                      </a>
                    )}
                  </ul>
                </TableCell>

                <TableCell align="center">{tool.types.join(", ")}</TableCell>

                <TableCell align="center">
                  <Link to={tool.fields.slug}>
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

      {/* <article tw="shadow w-full p-2 md:p-8">
        <h1 tw="text-3xl font-semibold pb-10">
          Compare {tools.length} Analysis Tools
        </h1>
        <div tw="p-8 bg-gray-300">
          <input
            onChange={() => filterTools(showProprietary)}
            type="checkbox"
            id="showproprietary"
            name="showproprietary"
            value="true"
          ></input>
          <label tw="ml-2" htmlFor="showproprietary">
            Hide proprietary tools
          </label>
        </div>

       
      </article> */}
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