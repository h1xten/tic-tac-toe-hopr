import React, { useEffect, useState } from 'react'
import useWebsocket from './useWebSocket'

export const WebSocketHandler = ({ 
        wsEndpoint,
        securityToken,
        multipleMessages = false,
        messages = [],
        setMessages = () => {}
    }) => {
  const [message, setMessage] = useState('')
  const websocket = useWebsocket({ wsEndpoint, securityToken })
  const { socketRef } = websocket
  const handleReceivedMessage = async (ev) => {
    try {
      const data = JSON.parse(ev.data)
      console.log('WebSocket Data', data)
      if (data.type === 'message') {
        setMessage(data.msg)
        setMessages((prevArr) => [...prevArr, data.msg])
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (!socketRef.current) return
    socketRef.current.addEventListener('message', handleReceivedMessage)

    return () => {
      if (!socketRef.current) return
      socketRef.current.removeEventListener('message', handleReceivedMessage)
    }
  }, [socketRef.current])

  return (
    <>
        { multipleMessages ? (
            <div>
                {messages.map((message) => (
                    <p>{message}</p>
                ))}
            </div>
        ) : (
            <span>
                {message ? message : 'You have no messages.'}
            </span>)
        }
    </>
    )
}

export default WebSocketHandler