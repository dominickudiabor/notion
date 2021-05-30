import * as React from 'react'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setEditedContentValue } from '../redux/actions'

Modal.setAppElement('#root')

// Define types for board item element properties
type BoardItemProps = {
    index: number
    item: { id: string; content: string }
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

const ModalButton = styled.button``

const ModalTextArea = styled.textarea`
    display: block;
    margin: 20px 0;
    resize: none;
`
// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState<string>(props.item.content)
  const dispatch = useDispatch()

  const activateModal = (e: any) => {
    setIsOpen(!isOpen)
  }

  const setEditContent = async () => {
    await dispatch(
      setEditedContentValue({ name: props.item.id, newContent: edit })
    )
    setIsOpen(false)
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
            onDoubleClick={() => activateModal(true)}
          >
            {/* The content of the BoardItem */}
            {props.item.content}
          </BoardItemEl>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => activateModal(false)}
          >
            <ModalButton onClick={setEditContent}>save</ModalButton>
            <ModalTextArea
              defaultValue={edit}
              onChange={(e) => setEdit(e.target.value)}
            ></ModalTextArea>
          </Modal>
        </>
      )}
    </Draggable>
  )
}
