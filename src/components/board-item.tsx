import * as React from 'react'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { setEditedContentValue } from '../redux/actions'
import { BoardItemEl, ModalButton, ModalTextArea } from './utils/styles'
import { BoardItemProps } from './utils/types'

Modal.setAppElement('#root')

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
