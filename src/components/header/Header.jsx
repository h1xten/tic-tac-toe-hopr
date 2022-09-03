import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import './Header.css'

const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)

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
                    />}>
                </Button>
                <Modal title='Player HOPR Node Settings' visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                    <label>Node API Endpoint</label>
                    <Input className='modal__inp' size='middle' />
                    <label>Security Token</label>
                    <Input className='modal__inp' size='middle' />
                    <label>HOPR Address</label>
                    <Input className='modal__inp' size='middle' placeholder='Your HOPR Address' disabled={true} />
                </Modal>
            </div>
        </div>
    </div>
  )
}

export default Header