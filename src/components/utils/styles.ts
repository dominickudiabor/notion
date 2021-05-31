import styled, { createGlobalStyle } from 'styled-components'
import { BoardColumnContentStylesProps, BoardItemStylesProps } from './types'

// Create styles for BoardColumnWrapper element
export const BoardColumnWrapper = styled.div`
    flex: 1;
    padding: 8px;
    background-color: #e5eff5;
    border-radius: 4px;

    & + & {
        margin-left: 12px;
    }
`

// Create styles for BoardColumnTitle element
export const BoardColumnTitle = styled.h2`
    font: 14px sans-serif;
    margin-bottom: 12px;
`

// Create styles for BoardColumnContent element
export const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
    min-height: 20px;
    background-color: ${(props) => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
`
export const BoardInput = styled.input`
    margin: 5px 0;
    padding: 10px 5px;
`

// Create styles board element properties
export const BoardEl = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

// Create style for board item element
export const BoardItemEl = styled.div<BoardItemStylesProps>`
    padding: 8px;
    background-color: ${(props) => (props.isDragging ? '#d3e4ee' : '#fff')};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;

    &:hover {
        background-color: #f7fafc;
    }

    & + & {
        margin-top: 4px;
    }
`

export const ModalButton = styled.button``

export const ModalTextArea = styled.textarea`
    display: block;
    margin: 20px 0;
    resize: none;
`

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
  }
`
