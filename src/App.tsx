import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import Routes from './Routes'
import { AppState } from './types'

const client = new W3CWebSocket('ws://127.0.0.1:8000')

export default function App() {
  const { ui } = useSelector((state: AppState) => state)

  useLayoutEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
      client.send(
        JSON.stringify({
          type: 'board-data',
          content: ui.board,
        })
      )
    }
    client.onmessage = (message: { data: {} }) => {
      console.log(message.data)
    }
  }, [ui])

  return (
    <>
      <Routes />
    </>
  )
}
