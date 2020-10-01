import ReactDOM from "react-dom"
import React, { useState } from "react"
import { WithContext as ReactTags } from "react-tag-input"

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const FilterTags = () => {
  let [tags, setTags] = useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
  ])
  let [suggestions, setSuggestions] = useState([
    { id: "USA", text: "USA" },
    { id: "Germany", text: "Germany" },
    { id: "Austria", text: "Austria" },
    { id: "Costa Rica", text: "Costa Rica" },
    { id: "Sri Lanka", text: "Sri Lanka" },
    { id: "Thailand", text: "Thailand" },
  ])

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = tag => {
    console.log("handleAddition")
    tags = [...tags, tag]
  }
  // handleAddition(tag) {
  //     this.setState(state => ({ tags: [...state.tags, tag] }));
  // }

  const handleDrag = (tag, currPos, newPos) => {
    console.log("handleDrag")
    let allTags = [...tags]
    const newTags = allTags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    tags = newTags
  }
  // handleDrag(tag, currPos, newPos) {
  //     const tags = [...this.state.tags];
  //     const newTags = tags.slice();

  //     newTags.splice(currPos, 1);
  //     newTags.splice(newPos, 0, tag);

  //     // re-render
  //     this.setState({ tags: newTags });
  // }

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
      />
    </div>
  )
}

export default FilterTags
