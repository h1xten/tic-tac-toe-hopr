import React, {useState} from 'react'
import { Button, Input, Modal } from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import './Header.css'
import { setSecurityToken } from '../../store/peerSlice/peerSlice'
import { useDispatch } from 'react-redux'

const Header = ({
        isModalVisible, setIsModalVisible,
        nodeApi, setNodeApi,
        setSkipPeerInfo,
        securityToken, setToken,
        hoprAddress,
        peerError, peerSuccess, peerLoading,
    }) => {
        const dispatch = useDispatch()
        const [clear, setClear] = useState(false)
        const handleSave = (securityToken) => {
            setClear(false)
            dispatch(setSecurityToken(securityToken))
            setSkipPeerInfo(false)
        }

        const handleClear = () => {
            setClear(true)
            dispatch(setSecurityToken(''))
            setSkipPeerInfo(true)
            setNodeApi('')
            setToken('')
        }
  return (
    <div className='navbar'>
        <div className='navbar__content wrapper'>
            <div className='navbar__logo'>Tic-Tac-Toe</div>
            <div className='navbar__settings'>
                <Button 
                    className='settings__btn' 
                    type='primary' 
                    shape='circle' 
                    icon={<SettingOutlined style={{fontSize: '25px'}}
                    onClick={() => setIsModalVisible(true)}
                    disabled = {peerLoading ? true : false}
                    />}>
                </Button>
                <Modal 
                    title='Player HOPR Node Settings'
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        <Button key='submit' type='primary' onClick={() => handleSave(securityToken)}>Save</Button>,
                        <Button key='clear' type='primary' danger onClick={() => handleClear()}>Clear</Button>
                    ]}>
                    <label>Node API Endpoint</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        value={nodeApi}
                        onChange={(e)=> setNodeApi(e.target.value)}
                    />
                    <label>Security Token</label>
                    <Input 
                        className='modal__inp'
                        size='middle'
                        value={securityToken}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <label>HOPR Address</label>
                    <Input 
                        className='modal__inp' 
                        size='middle' 
                        placeholder={peerLoading ? 'Loading...' : peerError ? 'Error!' : 'Your HOPR Address'} 
                        disabled={clear? true : hoprAddress ? false : true}
                        value={clear? '' : hoprAddress ? hoprAddress : ''}
                    />
                </Modal>
            </div>
        </div>
    </div>
  )
}

export default Header