import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setNewItemValue } from '../redux/actions'
// Import BoardItem component
import { BoardItem } from './board-item'

// Define types for board column element properties
type BoardColumnProps = {
    key: string
    column: any
    items: any
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
    isDraggingOver: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
    flex: 1;
    padding: 8px;
    background-color: #e5eff5;
    border-radius: 4px;

    & + & {
        margin-left: 12px;
    }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
    font: 14px sans-serif;
    margin-bottom: 12px;
`

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
    min-height: 20px;
    background-color: ${(props) => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
`
const BoardInput = styled.input`
    margin: 5px 0;
    padding: 10px 5px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  const dispatch = useDispatch()

  //handle user input
  const [input, setInput] = React.useState('')

  const handleNewInput = (e: { target: HTMLInputElement }) => {
    const { value } = e.target
    setInput(value)
  }

  const handleSubmit = async (event: {
        key: string
        currentTarget: { name: string; value: string }
    }) => {
    if (event.key === 'Enter') {
      if (input.length < 1) return
      const { name, value } = event.currentTarget
      setInput('')
      dispatch(setNewItemValue({ newItem: value, columnFocus: name }))
    }
  }

  return (
    <BoardColumnWrapper>
      {/* Title of the column */}
      <BoardColumnTitle>{props.column.title}</BoardColumnTitle>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          // Content of the column
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {/* All board items belong into specific column. */}
            {props.items.map((item: any, index: number) => (
              <BoardItem
                key={item.id}
                item={item}
                index={index}
              />
            ))}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
      <BoardInput
        type="text"
        name={props.column.id}
        value={input}
        placeholder="Add Item"
        onChange={handleNewInput}
        onKeyPress={handleSubmit}
      ></BoardInput>
    </BoardColumnWrapper>
  )
}
