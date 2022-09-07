import React from 'react'
import { useSelector } from 'react-redux'

const GameInfo = () => {
    const side = useSelector(state => state?.game?.side)
    const turn = useSelector(state => state?.game?.turn)
  return (
    <div className='game__info'>
        <h2 style={{color: 'var(--second-bg)'}}>Game Info</h2>
        <h3>Player Turn: {turn === 'you' ? 'You' : turn === 'turn' ? 'You' : 'Opponent'}</h3>
        <h3>Your Side: {side}</h3>
    </div>
  )
}

export default GameInfo