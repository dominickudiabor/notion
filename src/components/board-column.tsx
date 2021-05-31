import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { client } from './board'
import { BoardItem } from './board-item'
import {
  BoardColumnContent,
  BoardColumnTitle,
  BoardColumnWrapper,
  BoardInput,
} from './utils/styles'
import { BoardColumnProps } from './utils/types'

export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
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

      await client.send(
        JSON.stringify({
          type: 'add-new-content',
          content: { newItem: value, columnFocus: name.trim() },
        })
      )
      setInput('')
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
