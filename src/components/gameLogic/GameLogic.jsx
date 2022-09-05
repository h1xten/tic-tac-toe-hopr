import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus, gameTurn, setSide } from '../../store/gameSlice/gameSlice'
import { setOpponentNumber } from '../../store/peerSlice/peerSlice'
import Board from '../game/board/Board'
import {SettingOutlined} from '@ant-design/icons'
import './GameLogic.css'

const GameLogic = ({ nodeApi, messages}) => {
    const dispatch = useDispatch()

    const myStatus = useSelector(state => state?.peer?.status)
    const gamestatus = useSelector(state => state?.game?.status)
    const myNumber = useSelector(state => state?.peer?.randNumber)
    const recipient = useSelector(state => state?.peer?.opponent?.address)

    let gameMove = {}
    
    const lastMessage = messages.slice(-1)
        .map((move) => ({ move: move.split('-')[0], msg: move.split('-')[1] }))

    if((lastMessage[0]?.move === 'X' || lastMessage[0]?.move === 'O') && (lastMessage[0]?.msg >= 0 && lastMessage[0]?.msg <= 8)){
        gameMove = {value: lastMessage[0].move, index: lastMessage[0].msg}
        dispatch(gameTurn('you'))
    }

    if((myStatus === 'invite' && lastMessage[0]?.move === 'connected') || (myStatus === 'connected' && lastMessage[0]?.move === 'invite')) {
        dispatch(setOpponentNumber(lastMessage[0]?.msg))
        if(Number(myNumber) >= Number(lastMessage[0]?.msg)){
            dispatch(setSide('X'))
            dispatch(gameTurn('you'))
        }
        else {
            dispatch(setSide('O'))
            dispatch(gameTurn('opponent'))
        }
        dispatch(gameStatus('playing'))
    }

    return(
        <>
        { gamestatus === 'playing' ?
            <div className='game wrapper'> 
                <Board gameMove={gameMove} nodeApi={nodeApi} recipient={recipient} />
            </div>
            :
            <div className='game wrapper'>
                <div>
                    <p>1) Set Your Node Settings in <SettingOutlined style={{fontSize: '16px'}}/> </p>
                    <p>2) Create Game or Connect to the Game by entering an opponent's address </p>
                    <p>3) The side for which you will play (X or O) is chosen randomly.<br/>
                        When both players connect, they are given a randomly generated number. <br/>
                        The player whose number is greater than the opponent's number goes first (side X).
                    </p>
                    <h2>Good Luck :)</h2>
                </div>
            </div>
        }
        </>
    )
}

export default GameLogic