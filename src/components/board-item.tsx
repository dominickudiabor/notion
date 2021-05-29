import * as React from 'react'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Modal from 'react-modal'
import styled from 'styled-components'

//connect modal to app
Modal.setAppElement('#root')

// Define types for board item element properties
type BoardItemProps = {
    index: number
    item: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
    isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
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

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const activateModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        //The BoardItem
        <>
          <BoardItemEl
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onDoubleClick={activateModal}
          >
            {/* The content of the BoardItem */}
            {props.item.content}
          </BoardItemEl>
          <Modal
            isOpen={isOpen}
            onRequestClose={activateModal}
            contentLabel="My dialog"
          >
            <button onClick={activateModal}>Close modal</button>
            <textarea defaultValue={props.item.content}></textarea>
          </Modal>
        </>
      )}
    </Draggable>
  )
}
