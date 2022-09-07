import React, { useState} from 'react'
import WebSocketHandler from '../../components/webSocket/WebSocketHandler'
import Header from '../../components/header/Header'
import {  useGetPeerInfoQuery } from '../../store/peerSlice/peerApi'
import GameLogic from '../../components/gameLogic/GameLogic'

const Homepage = () => {
    
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)
    const [isGameModalVisible, setIsGameModalVisible] = useState(false)
    const [isConnectModalVisible, setIsConnectModalVisible] = useState(false)
    const [clear, setClear] = useState(false)
    const [nodeApi, setNodeApi] = useState('')
    const [wsEndpoint, setWsEndpoint] = useState('')
    const [skipPeerInfo, setSkipPeerInfo] = useState(true)
    const [securityToken, setToken] = useState('')
    const [messages, setMessages] = useState([])

    const { data: peer,
            isLoading: peerLoading,
            isError: peerError,
            isSuccess: peerSuccess,
            error } = useGetPeerInfoQuery({nodeApi}, {
        skip: skipPeerInfo,
    })

  return (
    <div className='tic-tac-toe'>
        <Header 
            isSettingsModalVisible={isSettingsModalVisible} setIsSettingsModalVisible={setIsSettingsModalVisible}
            isGameModalVisible={isGameModalVisible} setIsGameModalVisible={setIsGameModalVisible}
            isConnectModalVisible={isConnectModalVisible} setIsConnectModalVisible={setIsConnectModalVisible}
            clear={clear} setClear={setClear}
            nodeApi={nodeApi} setNodeApi={setNodeApi}
            wsEndpoint={wsEndpoint} setWsEndpoint={setWsEndpoint}
            setSkipPeerInfo={setSkipPeerInfo}
            securityToken = {securityToken} setToken = {setToken}
            hoprAddress = {peer?.hoprAddress ? peer.hoprAddress : ''}
            peerError={peerError}
            peerSuccess={peerSuccess}
            peerLoading={peerLoading}
        />

        <GameLogic nodeApi={nodeApi} messages={messages}/>

        {securityToken && 
            <WebSocketHandler 
                wsEndpoint={`${wsEndpoint}/api/v2/messages/websocket`}
                securityToken={securityToken}
                setMessages={setMessages}
            />
        }
    </div>
  )
}

export default Homepage