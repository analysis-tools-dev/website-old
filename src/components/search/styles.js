import React from "react"
import styled, { css } from "styled-components"

const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
`
const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`
const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
`
export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  {highlight-next-line}
  ${props => (props.collapse ? collapse : expand)};
`
export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`
export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
`

export const PoweredBy = () => (
  <span>
    Powered by{` `}
    <a href="https://algolia.com">Algolia</a>
  </span>
)
