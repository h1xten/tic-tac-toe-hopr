import React, { useEffect, useState } from 'react'
import WebSocketHandler from '../../components/WebSocket/WebSocketHandler'
import ClusterHelper from '../../components/ClusterHelper/ClusterHelper'

import {Buffer} from 'buffer'

const Homepage = () => {
    const [securityToken, setSecurityToken] = useState('^^LOCAL-testing-123^^')
    const [selectedNode, setSelectedNode] = useState()
    const [wsEndpoint, setWsEndpoint] = useState('wss://19505-hoprnet-hoprnet-lgxangofxaz.ws-eu63.gitpod.io')
    const [httpEndpoint, setHTTPEndpoint] = useState('https://13305-hoprnet-hoprnet-lgxangofxaz.ws-eu63.gitpod.io')
    const [messages, setMessages] = useState([])
    const [address, setAddress] = useState('')
    const [isReferee, setIsReferee] = useState('16Uiu2HAmF5FBT7K4RY8MwfvpCdg162GeN7cMAVJzJZxRZtBNSMUq')
    const [referee, setReferee] = useState('')

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
        <ClusterHelper selectedNode={address} />
        <WebSocketHandler
            wsEndpoint={wsEndpoint}
            securityToken={securityToken}
        />
    </div>
  )
}

export default Homepage