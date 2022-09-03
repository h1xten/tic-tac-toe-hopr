import React, { useEffect, useState } from 'react'
import WebSocketHandler from '../../components/webSocket/WebSocketHandler'
import ClusterHelper from '../../components/clusterHelper/ClusterHelper'

import {Buffer} from 'buffer'

const Homepage = () => {
    const [securityToken, setSecurityToken] = useState(`${process.env.REACT_APP_SECURITY_TOKEN}`)
    const [selectedNode, setSelectedNode] = useState()
    const [wsEndpoint, setWsEndpoint] = useState(`${process.env.REACT_APP_N5_WS}`)
    const [httpEndpoint, setHTTPEndpoint] = useState(`${process.env.REACT_APP_N5_REST_API}`)
    const [messages, setMessages] = useState([])
    const [address, setAddress] = useState('')
    const [isReferee, setIsReferee] = useState(true)
    const [referee, setReferee] = useState(`${process.env.REACT_APP_N5_ADDRESS}`)

    const getHeaders = (isPost = false) => {
        const headers = new Headers()
        if (isPost) {
          headers.set('Content-Type', 'application/json')
          headers.set('Accept-Content', 'application/json')
        }
        headers.set('Authorization', 'Basic ' + Buffer.from(securityToken).toString('base64'))
        return headers
      }

    useEffect(() => {
        const loadAddress = async () => {
          const headers = getHeaders(securityToken)
          const account = await fetch(`${httpEndpoint}/api/v2/account/addresses`, {
            headers
          })
            .then((res) => res.json())
            .catch((err) => console.error(err))
          setAddress(account?.hopr)
        }
        loadAddress()
    }, [securityToken, httpEndpoint])


    const sendMessage = async (recipient, body) => {
        if (!address) return
        await fetch(`${httpEndpoint}/api/v2/messages`, {
          method: 'POST',
          headers: getHeaders(securityToken, true),
          body: JSON.stringify({
            recipient,
            body
          })
        }).catch((err) => console.error(err))
      }
    
      const sendMove = async (move) => {
        await sendMessage(referee, `${address}-${move}`)
      }

  return (
    <div>
        {/* <ClusterHelper selectedNode={address} /> */}
        <WebSocketHandler
            wsEndpoint={wsEndpoint}
            securityToken={securityToken}
            multipleMessages = {isReferee}
            messages={messages}
            setMessages = {setMessages}
        />
    </div>
  )
}

export default Homepage