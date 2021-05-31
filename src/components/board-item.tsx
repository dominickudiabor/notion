import * as React from 'react'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Modal from 'react-modal'
import { client } from './board'
import { BoardItemEl, ModalButton, ModalTextArea } from './utils/styles'
import { BoardItemProps } from './utils/types'

Modal.setAppElement('#root')

export const BoardItem = (props: BoardItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState<string>(props.item.content)

  const activateModal = (e: any) => {
    setIsOpen(!isOpen)
  }

  const setEditContent = async () => {
    await client.send(
      JSON.stringify({
        type: 'edit-content',
        content: { name: props.item.id, newContent: edit },
      })
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
