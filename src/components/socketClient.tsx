import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import React, { useEffect, useRef, useState } from 'react'
import Identicon from 'react-identicons'
import Editor from 'react-medium-editor'
import { Navbar, NavbarBrand, UncontrolledTooltip } from 'reactstrap'
import { v4 } from 'uuid'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

type SocketConectionProps = {
    currentUsers: any[]
    userActivity: any[]
    username: any
    text: string
}
const client = new W3CWebSocket('ws://127.0.0.1:8000')
const contentDefaultMessage = 'Start writing your document here'

export const SocketConnection = () => {
  const [state, setState] = useState<SocketConectionProps>({
    currentUsers: [],
    userActivity: [],
    username: useRef<HTMLInputElement>(null),
    text: '',
  })

  const handleInputChange = (e: { target: { value: any } }) => {
    setState({ ...state, username: e.target.value })
  }

  const logInUser = async () => {
    executeSocket(state)
  }

  const executeSocket = (data: any) => {
    client.send(
      JSON.stringify({
        ...data,
        type: 'userevent',
      })
    )
  }

  /* When content changes, we send the
current content of the editor to the server. */
  const onEditorStateChange = (text: any) => {
    client.send(
      JSON.stringify({
        type: 'contentchange',
        username: state.username,
        content: text,
      })
    )
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    client.onmessage = (message: { data: string }) => {
      const dataFromServer = JSON.parse(message.data)
      const stateToChange = {} as any
      if (dataFromServer.type === 'userevent') {
        stateToChange.currentUsers = Object.values(
          dataFromServer.data.users
        )
      } else if (dataFromServer.type === 'contentchange') {
        stateToChange.text =
                    dataFromServer.data.editorContent || contentDefaultMessage
      }
      stateToChange.userActivity = dataFromServer.data.userActivity
      setState({
        ...stateToChange,
      })
    }
  }, [])

  const showLoginSection = () => (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <Identicon
              className="account__avatar"
              size={64}
              string="randomness"
            />
            <p className="account__name">Hello, user!</p>
            <p className="account__sub">
                            Join to edit the document
            </p>
          </div>
          <input
            name="username"
            className="form-control"
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={() => logInUser()}
            className="btn btn-primary account__btn"
          >
                        Join
          </button>
        </div>
      </div>
    </div>
  )

  const showEditorSection = () => (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          {state.currentUsers.map((user) => (
            <div key={v4()}>
              <span
                id={user.username}
                className="userInfo"
                key={user.username}
              >
                <Identicon
                  className="account__avatar"
                  style={{
                    backgroundColor: user.randomcolor,
                  }}
                  size={40}
                  string={user.username}
                />
              </span>
              <UncontrolledTooltip
                placement="top"
                target={user.username}
              >
                {user.username}
              </UncontrolledTooltip>
            </div>
          ))}
        </div>
        <Editor
          options={{
            placeholder: {
              text: state.text ? contentDefaultMessage : '',
            },
          }}
          className="body-editor"
          text={state.text}
          onChange={onEditorStateChange}
        />
      </div>
      <div className="history-holder">
        <ul>
          {state.userActivity.map((activity, index) => (
            <li key={`activity-${index}`}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  )
  return (
    <React.Fragment>
      <Navbar color="light" light>
        <NavbarBrand href="/socket-test">
                    Real-time document editor
        </NavbarBrand>
      </Navbar>
      <div className="container-fluid">
        {!state.username ? showEditorSection() : showLoginSection()}
      </div>
    </React.Fragment>
  )
}
