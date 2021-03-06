import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import {
  refreshBoardState,
  setEditedContentValue,
  setNewItemValue,
} from '../redux/actions'
import { AppState } from '../types'
import { BoardColumn } from './board-column'
import { BoardEl } from './utils/styles'

export const client = new W3CWebSocket('ws://127.0.0.1:8000')

export const Board = () => {
  // Initialize board state with board data
  const { board: state } = useSelector((state: AppState) => state.ui)

  const dispatch = useDispatch()

  //runs after when component renders
  React.useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    client.onmessage = (message: { data: any }) => {
      const syncData = JSON.parse(message.data)
      console.log('Got reply from server', JSON.parse(message.data))

      switch (syncData.type) {
      case 'move-content-same-column':
      case 'move-content-different-column':
        dispatch(refreshBoardState(syncData.content))
        break
      case 'add-new-content':
        dispatch(setNewItemValue(syncData.content))
        break
      case 'edit-content':
        dispatch(setEditedContentValue(syncData.content))
        break

      default:
        break
      }
    }
  }, [dispatch])

  // Handle drag & drop
  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result
    console.log(source, destination, draggableId)

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
            destination.index === source.index
    ) {
      return
    }

    // Find column from which the item was dragged from
    const columnStart = (state.columns as any)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (state.columns as any)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds,
      }

      // Create new board state with updated data for columns
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
        },
      }

      //inform the server of an updated board
      await client.send(
        JSON.stringify({
          type: 'move-content-same-column',
          content: newState,
        })
      )
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds,
      }

      // Get all item ids in destination list
      const newFinishItemsIds = Array.from(columnFinish.itemsIds)

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds,
      }

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      }

      //inform the server of an updated board
      await client.send(
        JSON.stringify({
          type: 'move-content-different-column',
          content: newState,
        })
      )
    }
  }

  return (
    <BoardEl>
      {/* Create context for drag & drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Get all columns in the order specified in 'board-initial-data.ts' */}
        {state.columnsOrder.map((columnId) => {
          // Get id of the current column
          const column = (state.columns as any)[columnId]

          // Get item belonging to the current column
          const items = column.itemsIds.map(
            (itemId: string) => (state.items as any)[itemId]
          )

          // Render the BoardColumn component
          return (
            <BoardColumn
              key={column.id}
              column={column}
              items={items}
            />
          )
        })}
      </DragDropContext>
    </BoardEl>
  )
}
