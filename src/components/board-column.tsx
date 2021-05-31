import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { refreshBoardState, setNewItemValue } from '../redux/actions'
import { AppState } from '../types'
import { client } from './board'
// Import BoardItem component
import { BoardItem } from './board-item'
import {
  BoardColumnContent,
  BoardColumnTitle,
  BoardColumnWrapper,
  BoardInput,
} from './utils/styles'
import { BoardColumnProps } from './utils/types'

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  const dispatch = useDispatch()
  const { board } = useSelector((state: AppState) => state.ui)

  //handle user input
  const [input, setInput] = React.useState('')

  //runs after when component renders
  React.useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    client.onmessage = (message: { data: any }) => {
      const syncData = JSON.parse(message.data)
      console.log('Got reply from server', JSON.parse(message.data))
      dispatch(refreshBoardState(syncData.content))
    }
  }, [dispatch])

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
      await dispatch(
        setNewItemValue({ newItem: value, columnFocus: name.trim() })
      )
      await client.send(
        JSON.stringify({
          type: 'message',
          content: board,
        })
      )
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
