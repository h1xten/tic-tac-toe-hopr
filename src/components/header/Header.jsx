import React from 'react'
import { Button, Input, Modal } from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import './Header.css'
import HoprIcon from '../../assets/hopr_icon.png'
import { setMyNumber, setMyStatus, setOpponent, setSecurityToken } from '../../store/peerSlice/peerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { peerApi, useSendMessageMutation } from '../../store/peerSlice/peerApi'
import { getRandom } from '../../utils/getRandom'


const Header = ({
        isSettingsModalVisible, setIsSettingsModalVisible,
        isGameModalVisible, setIsGameModalVisible,
        isConnectModalVisible, setIsConnectModalVisible,
        clear, setClear,
        nodeApi, setNodeApi,
        setSkipPeerInfo,
        securityToken, setToken,
        hoprAddress,
        peerError, peerSuccess, peerLoading,
    }) => {
        const dispatch = useDispatch()
        const recipient = useSelector(state => state.peer?.opponent?.address)

        const handleSave = (securityToken) => {
            setClear(false)
            dispatch(setSecurityToken(securityToken))
            setSkipPeerInfo(false)
        }

        const handleClear = () => {
            setClear(true)
            dispatch(setSecurityToken(''))
            dispatch(setOpponent(''))
            setSkipPeerInfo(true)
            setNodeApi('')
            setToken('')
            dispatch(peerApi.util.resetApiState())
        }

        const [sendMessage] = useSendMessageMutation()

        const handleSendMessage = () => {
            const randNumber = getRandom(500)
            sendMessage({nodeApi, recipient, body:`invite-${randNumber}`})
            dispatch(setMyStatus('invite'))
            dispatch(setMyNumber(randNumber))
        }

        const handleConnect = () => {
            const randNumber = getRandom(500)
            sendMessage({nodeApi, recipient, body:`connected-${randNumber}`})
            dispatch(setMyStatus('connected'))
            dispatch(setMyNumber(randNumber))
        }

  return (
    <div className='navbar'>
        <div className='navbar__content wrapper'>
            <div className='navbar__logo'><img className='hopr_icon' src={HoprIcon} alt="logo" />Tic-Tac-Toe</div>
            <div className='navbar__settings'>
                {/* Create Game */}
                <Button 
                    type='primary'
                    onClick={() => setIsGameModalVisible(true)}
                >
                    Create Game
                </Button>
                <Modal 
                    title='Create Game'
                    visible={isGameModalVisible}
                    onCancel={() => setIsGameModalVisible(false)}
                    footer={
                        <Button key='submit' type='primary' onClick={() => 
                            handleSendMessage(hoprAddress)}>
                            Create Game
                        </Button>
                    }
                >
                    <label>Your HOPR Address</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        value={hoprAddress}
                    />
                    <label>Opponent HOPR Address</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        placeholder='Opponent address'
                        value={recipient}
                        onChange={(e) => dispatch(setOpponent(e.target.value)) }
                    />
                </Modal>
                {/* Connect to the Game */}
                <Button 
                    type='primary'
                    onClick={() => setIsConnectModalVisible(true)}
                >
                    Connect to the Game
                </Button>
                <Modal 
                    title='Connect to the Game'
                    visible={isConnectModalVisible}
                    onCancel={() => setIsConnectModalVisible(false)}
                    footer={
                        <Button key='submit' type='primary' onClick={() => 
                            handleConnect(hoprAddress)}>
                            Connect to the Game
                        </Button>
                    }
                >
                    <label>Opponent HOPR Address</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        placeholder='Opponent address'
                        value={recipient}
                        onChange={(e) => dispatch(setOpponent(e.target.value)) }
                    />
                </Modal>
                {/* Settings */}
                <Button 
                    className='settings__btn' 
                    type='primary' 
                    shape='circle' 
                    icon={<SettingOutlined style={{fontSize: '25px'}}
                    onClick={() => setIsSettingsModalVisible(true)}
                    disabled = {peerLoading ? true : false}
                    />}>
                </Button>
                <Modal 
                    title='Player HOPR Node Settings'
                    visible={isSettingsModalVisible}
                    onCancel={() => setIsSettingsModalVisible(false)}
                    footer={[
                        <Button key='submit' type='primary' onClick={() => handleSave(securityToken)}>Save</Button>,
                        <Button key='clear' type='primary' danger onClick={() => handleClear()}>Clear</Button>
                    ]}>
                    <label>Node API Endpoint</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        value={nodeApi}
                        onChange={(e)=> {
                            setNodeApi(e.target.value)
                        }}
                    />
                    <label>Security Token</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        value={securityToken}
                        onChange={(e) => {
                            setToken(e.target.value)
                        }}
                    />
                    <label>HOPR Address</label>
                    <Input 
                        className='modal__inp' 
                        size='middle' 
                        placeholder={peerLoading ? 'Loading...' : peerError ? 'Error!' : 'Your HOPR Address'} 
                        disabled={clear? true : hoprAddress ? false : true}
                        value={clear? '' : peerError? '' : hoprAddress ? hoprAddress : ''}
                    />
                </Modal>
            </div>
        </div>
    </div>
  )
}

export default Header