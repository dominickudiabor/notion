import {
  BoardState,
  DialogType,
  newItemProps,
  RefreshBoardStateAction,
  REFRESH_BOARD_STATE,
  SetNewValueAction,
  SetRefreshValueAction,
  SET_NEW_VALUE,
  SET_REFRESH_VALUE,
  ToggleDialogAction,
  TOGGLE_DIALOG,
} from '../../types'

export function toggleDialog(dialog: DialogType): ToggleDialogAction {
  return {
    type: TOGGLE_DIALOG,
    payload: {
      dialog,
    },
  }
}

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

export function refreshBoard(activate: Boolean): SetRefreshValueAction {
  return {
    type: SET_REFRESH_VALUE,
    payload: {
      activate,
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
