import { Button } from 'antd'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameTurn } from '../../../store/gameSlice/gameSlice'
import { useSendMessageMutation } from '../../../store/peerSlice/peerApi'
import { calculateWinner } from '../../../utils/calculateWinner'
import Square from '../square/Square'

const Board = ({gameMove, nodeApi, recipient}) => {
    const dispatch = useDispatch()
    const whichTurn = useSelector(state => state?.game?.turn)
    const side = useSelector(state => state?.game?.side)

    const [board, setBoard] = useState(Array(9).fill(''))
    // const [turn, setTurn] = useState('X')
    const winner = calculateWinner(board)

    const [sendMessage] = useSendMessageMutation()

    useEffect(()=>{
        if(whichTurn === 'you') {
            const copyBoard = [...board]
            copyBoard.splice(gameMove.index, 1, gameMove.value)
            setBoard(copyBoard)
            dispatch(gameTurn('turn'))
        }
    }, [whichTurn])

    const handleClick = (index) => {
        if(index < 0 || index > 9 || board[index] || winner || whichTurn === 'opponent') return
        sendMessage({nodeApi, recipient, body: `${side}-${index}`})
        dispatch(gameTurn('opponent'))
        const newBoard = [...board]
        newBoard.splice(index, 1, side)
        setBoard(newBoard)
    }

    const handleRestart = () => {
        setBoard(Array(9).fill(''))
    }

  return (
    <div className='field'>
        {winner && <h1>Winner is {winner}</h1>}
        <div className='board'>
            {board.map((value, index) => (
                <Square key={index} index={index} value={value} handleClick={handleClick} />
            ))}
        </div>
        <Button type='primary' onClick={handleRestart}>Restart</Button>
    </div>
  )
}

export default Board