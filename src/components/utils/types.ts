// Define types for board column element properties
export type BoardColumnProps = {
    key: string
    column: any
    items: any
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
export type BoardColumnContentStylesProps = {
    isDraggingOver: boolean
}

// Define types for board item element properties
export type BoardItemProps = {
    index: number
    item: { id: string; content: string }
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
export type BoardItemStylesProps = {
    isDragging: boolean
}
