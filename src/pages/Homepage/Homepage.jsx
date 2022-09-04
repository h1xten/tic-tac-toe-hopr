import React, { useState} from 'react'


import Header from '../../components/header/Header'
import {  useGetPeerInfoQuery } from '../../store/peerSlice/peerApi'

const Homepage = () => {
    // const [wsEndpoint, setWsEndpoint] = useState(`${process.env.REACT_APP_N5_WS}`)
    // const [httpEndpoint, setHTTPEndpoint] = useState(`${process.env.REACT_APP_N5_REST_API}`)
    // const [messages, setMessages] = useState([])
    // const [address, setAddress] = useState('')
    // const [isReferee, setIsReferee] = useState(true)
    // const [referee, setReferee] = useState(`${process.env.REACT_APP_N5_ADDRESS}`)


    // const sendMessage = async (recipient, body) => {
    //     if (!address) return
    //     await fetch(`${httpEndpoint}/api/v2/messages`, {
    //       method: 'POST',
    //       headers: getHeaders(securityToken, true),
    //       body: JSON.stringify({
    //         recipient,
    //         body
    //       })
    //     }).catch((err) => console.error(err))
    //   }
    
    //   const sendMove = async (move) => {
    //     await sendMessage(referee, `${address}-${move}`)
    //   }
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)
    const [isGameModalVisible, setIsGameModalVisible] = useState(false)
    const [isConnectModalVisible, setIsConnectModalVisible] = useState(false)
    const [clear, setClear] = useState(false)
    const [nodeApi, setNodeApi] = useState('')
    const [skipPeerInfo, setSkipPeerInfo] = useState(true)
    const [securityToken, setToken] = useState('')

    const { data: peer,
            isLoading: peerLoading,
            isError: peerError,
            isSuccess: peerSuccess,
            error } = useGetPeerInfoQuery({nodeApi}, {
        skip: skipPeerInfo,
    })

  return (
    <div>
        <Header 
            isSettingsModalVisible={isSettingsModalVisible} setIsSettingsModalVisible={setIsSettingsModalVisible}
            isGameModalVisible={isGameModalVisible} setIsGameModalVisible={setIsGameModalVisible}
            isConnectModalVisible={isConnectModalVisible} setIsConnectModalVisible={setIsConnectModalVisible}
            clear={clear} setClear={setClear}
            nodeApi={nodeApi} setNodeApi={setNodeApi}
            setSkipPeerInfo={setSkipPeerInfo}
            securityToken = {securityToken} setToken = {setToken}
            hoprAddress = {peer?.hoprAddress ? peer.hoprAddress : ''}
            peerError={peerError}
            peerSuccess={peerSuccess}
            peerLoading={peerLoading} />
        {/* <WebSocketHandler
            wsEndpoint={wsEndpoint}
            securityToken={securityToken}
            multipleMessages = {isReferee}
            messages={messages}
            setMessages = {setMessages}
        /> */}
    </div>
  )
}

export default Homepage