import {
  BoardState,
  newItemProps,
  RefreshBoardStateAction,
  REFRESH_BOARD_STATE,
  SetNewValueAction,
  SET_NEW_VALUE,
} from '../../types'

export function setNewItemValue(
  newItemDetails: newItemProps
): SetNewValueAction {
  return {
    type: SET_NEW_VALUE,
    payload: {
      newItemDetails,
    },
  }
}

export function refreshBoardState(
  newState: BoardState
): RefreshBoardStateAction {
  return {
    type: REFRESH_BOARD_STATE,
    payload: {
      newState,
    },
  }
}
