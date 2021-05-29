import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Board } from '../components/board'

// Import main Board component

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
  }
`

// Create component for the page
export const Home = () => (
  <>
    {/* Add main Board component */}
    <Board />

    {/* Add GlobalStyle */}
    <GlobalStyle />
  </>
)
