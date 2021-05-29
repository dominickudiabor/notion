import { initialBoardData } from '../../data/board-initial-data'
import {
  REFRESH_BOARD_STATE,
  SET_NEW_VALUE,
  SET_REFRESH_VALUE,
  TOGGLE_DIALOG,
  UiActions,
  UiState,
} from '../../types'

const defaultState: UiState = {
  board: initialBoardData,
  dialogOpen: {},
  newCardItem: '',
  focusCard: '',
  refresh: false,
}

export default function ui(
  state: UiState = defaultState,
  action: UiActions
): UiState {
  switch (action.type) {
  case TOGGLE_DIALOG: {
    return {
      ...state,
      dialogOpen: {
        ...state.dialogOpen,
        [action.payload.dialog]:
                        !state.dialogOpen[action.payload.dialog],
      },
    }
  }

  case SET_NEW_VALUE: {
    const { newItem, columnFocus } = action.payload.newItemDetails
    return {
      ...state,
      newCardItem: newItem,
      focusCard: columnFocus,
    }
  }

  case SET_REFRESH_VALUE: {
    return {
      ...state,
      refresh: action.payload.activate,
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
