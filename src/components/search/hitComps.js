import React from "react"
import { Highlight } from "react-instantsearch-dom"
import { Link } from "gatsby"
// import { Tags } from "styled-icons/fa-solid/Tags"

export const ToolsHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={hit.fields.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="name" hit={hit} tagName="mark" />
      </h4>
      {hit.description}
      {/* FIXME */}
      {/* <Snippet attribute="description" hit={hit} tagName="mark" /> */}
      {/* {hit.tags.map((tag, index) => (
        <Fragment key={tag}>
          {index > 0 && `, `}
          {tag}
        </Fragment>
      ))} */}
    </Link>
  </div>
)

// export const PostHit = clickHandler => ({ hit }) => (
//   <div>
//     <Link to={`/blog` + hit.slug} onClick={clickHandler}>
//       <h4>
//         <Highlight attribute="title" hit={hit} tagName="mark" />
//       </h4>
//     </Link>
//     <div>
//       <Calendar size="1em" />
//       &nbsp;
//       <Highlight attribute="date" hit={hit} tagName="mark" />
//       &emsp;
//       <Tags size="1em" />
//       &nbsp;
//       {hit.tags.map((tag, index) => (
//         <Fragment key={tag}>
//           {index > 0 && `, `}
//           {tag}
//         </Fragment>
//       ))}
//     </div>
//     <Snippet attribute="excerpt" hit={hit} tagName="mark" />
//   </div>
// )
