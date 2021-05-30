// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

//UI types
export const REFRESH_BOARD_STATE = 'REFRESH_BOARD_STATE'
export const SET_NEW_VALUE = 'SET_NEW_VALUE'
export const SET_EDIT_VALUE = 'SET_EDIT_VALUE'
// Enum
export enum DialogType {
    SignIn = 'signIn',
    SignUp = 'signUp',
}

// Product Action
export type Product = {
    id: string
    name: string
    price: number
}

export type AddProductAction = {
    type: typeof ADD_PRODUCT
    payload: {
        product: Product
    }
}

export type RemoveProductAction = {
    type: typeof REMOVE_PRODUCT
    payload: {
        product: Product
    }
}

//Ui Actions

export type SetNewValueAction = {
    type: typeof SET_NEW_VALUE
    payload: {
        newItemDetails: newItemProps
    }
}

export type RefreshBoardStateAction = {
    type: typeof REFRESH_BOARD_STATE
    payload: {
        newState: BoardState
    }
}

export type SetEditedContentAction = {
    type: typeof SET_EDIT_VALUE
    payload: {
        editCard: { name: string; newContent: string }
    }
}

//miscellaneous
export type newItemProps = {
    newItem: string
    columnFocus: string
}

export type UiActions =
    | SetNewValueAction
    | RefreshBoardStateAction
    | SetEditedContentAction

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
    inCart: Product[]
}

// Using dynamic keys from an enum
export type UiState = {
    board: BoardState
}

export type AppState = {
    product: ProductState
    ui: UiState
}

export type BoardState = {
    items: { [name: string]: { id: string; content: string } }
    columns: {
        [name: string]: { id: string; title: string; itemsIds: string[] }
    }
    columnsOrder: string[]
}
