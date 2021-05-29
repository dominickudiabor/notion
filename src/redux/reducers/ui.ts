import { v4 } from 'uuid'
import { initialBoardData } from '../../data/board-initial-data'
import {
  REFRESH_BOARD_STATE,
  SET_NEW_VALUE,
  UiActions,
  UiState,
} from '../../types'
const defaultState: UiState = {
  board: initialBoardData,
}

export default function ui(
  state: UiState = defaultState,
  action: UiActions
): UiState {
  switch (action.type) {
  case SET_NEW_VALUE: {
    const { newItem, columnFocus } = action.payload.newItemDetails
    const uniqueId = v4()
    return {
      ...state,
      board: {
        ...state.board,
        items: {
          ...state.board.items,
          [uniqueId]: { id: uniqueId, content: newItem },
        },
        columns: {
          ...state.board.columns,
          [columnFocus]: {
            ...state.board.columns[columnFocus],
            itemsIds: [
              ...state.board.columns[columnFocus].itemsIds,
              uniqueId,
            ],
          },
        },
      },
    }
  }

  case REFRESH_BOARD_STATE: {
    return {
      ...state,
      board: action.payload.newState,
    }
  }

  default:
    return state
  }
}
