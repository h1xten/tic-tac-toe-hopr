export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]
        }
    }
    return null
}
// const winningPositions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ]

// let winningPosIndex = 0
// let newWinner = ''
// while(winningPosIndex < winningPositions.length && !newWinner) {
//     const boardPosToCheck = winningPositions[winningPosIndex]
//     const boardValuesToCheck = boardPosToCheck.map(index => board[index])
//     const checkingValue = boardValuesToCheck[0]
//     const isFinished = boardValuesToCheck.every((value) => value === checkingValue && checkingValue )
//     newWinner = isFinished ? checkingValue : null
//     winningPosIndex++
// }

// if(newWinner) {
//     setWinner(newWinner === 'X' ? 'PLAYER 1' : 'PLAYER 2')
// }