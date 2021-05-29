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
    return {
      ...state,
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
