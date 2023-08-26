let reversePlayerTurn = ''
const button1 = document.getElementById("1")
const button2 = document.getElementById("2")
const button3 = document.getElementById("3")
const button4 = document.getElementById("4")
const button5 = document.getElementById("5")
const button6 = document.getElementById("6")
const button7 = document.getElementById("7")
const button8 = document.getElementById("8")
const button9 = document.getElementById("9")

const sequenceWinner = [
    [button1, button2, button3],
    [button4, button5, button6],
    [button7, button8, button9],
    [button1, button4, button7],
    [button2, button5, button8],
    [button3, button6, button9],
    [button1, button5, button9],
    [button3, button5, button7]
]

document.getElementById('buttonPlay').addEventListener('click', function () {

    const X = document.getElementById('X').value
    const O = document.getElementById('O').value
    const playerInitial = document.getElementById('playerInitial').value
    const h4namePlayers = document.getElementById('namePlayer')

    if (playerInitial === 'X') {
        reversePlayerTurn = 'O'
        h4namePlayers.innerText = 'O jogo começa para ' + X + ' X'
    } else if (playerInitial === 'O') {
        reversePlayerTurn = 'X'
        h4namePlayers.innerText = 'O jogo começa para ' + O + ' O'
    } else {
        alert('Você deve escolher entre X e O !')
        return
    }

    function verifyWinner() {

        const lines = [
            [button1, button2, button3],
            [button4, button5, button6],
            [button7, button8, button9],
        ]

        const columns = [
            [button1, button4, button7],
            [button2, button5, button8],
            [button3, button6, button9],
        ]

        const firstDiagonal = [
            [button1, button5, button9]
        ]

        const secondDiagonal = [
            [button3, button5, button7]
        ]

        for (const combination of sequenceWinner) {
            const [cell1, cell2, cell3] = combination
            const value1 = cell1.dataset.cell
            const value2 = cell2.dataset.cell
            const value3 = cell3.dataset.cell

            if (value1 && value1 === value2 && value2 === value3) {
                const winner = value1 === "O" ? "O" : "X"

                const foundLine = lines.some(line => {
                    return line[0] === cell1 && line[1] === cell2 && line[2] === cell3
                })

                if (foundLine) {
                    cell1.classList.replace('cell', 'cell-Lines')
                    cell2.classList.replace('cell', 'cell-Lines')
                    cell3.classList.replace('cell', 'cell-Lines')
                }

                const foundColumns = columns.some(column => {
                    return column[0] === cell1 && column[1] === cell2 && column[2] === cell3
                })

                if (foundColumns) {
                    cell1.classList.replace('cell', 'cell-columns')
                    cell2.classList.replace('cell', 'cell-columns')
                    cell3.classList.replace('cell', 'cell-columns')
                }

                const foundFirstDiagonal = firstDiagonal.some(oneDiagonal => {
                    return oneDiagonal[0] === cell1 && oneDiagonal[1] === cell2 && oneDiagonal[2] === cell3
                })

                if (foundFirstDiagonal) {
                    cell1.classList.replace('cell', 'cell-diagonal1')
                    cell2.classList.replace('cell', 'cell-diagonal1')
                    cell3.classList.replace('cell', 'cell-diagonal1')
                }

                const foundSecondDiagonal = secondDiagonal.some(twoDiagonal => {
                    return twoDiagonal[0] === cell1 && twoDiagonal[1] === cell2 && twoDiagonal[2] === cell3
                })

                if (foundSecondDiagonal) {
                    cell1.classList.replace('cell', 'cell-diagonal2')
                    cell2.classList.replace('cell', 'cell-diagonal2')
                    cell3.classList.replace('cell', 'cell-diagonal2')
                }

                h4namePlayers.style.display = 'none'

                if (winner === 'X') {
                    document.getElementById('winnerPlayer').innerText = "O player " + X + " (" + winner + ")" + " ganhou!!"
                } else {
                    document.getElementById('winnerPlayer').innerText = "O player " + O + " (" + winner + ")" + " ganhou!!"
                }

                document.querySelectorAll('button').forEach(function (button) {
                    if (button.id !== 'buttonReset' && button.id !== 'buttonPlay') {
                        button.setAttribute('disabled', !button.disabled)
                    }
                })
                return
            }
        }
        const allCellsFilled = sequenceWinner.flat().every(cell => cell.dataset.cell !== "")
        if (allCellsFilled) {
            document.getElementById('winnerPlayer').innerText = "Houve um empate"
            h4namePlayers.style.display = 'none'
            return
        }
    }

    if (buttonPlay) {
        document.querySelectorAll('button').forEach(function (button) {

            if (button.id !== 'buttonPlay' && button.id !== 'buttonReset') {
                button.addEventListener('click', function () {
                    button.setAttribute('disabled', !button.disabled)
                    button.dataset.cell = reversePlayerTurn === 'O' ? 'X' : 'O'
                    verifyWinner()
                })
            }
        })

        document.querySelectorAll('.cell').forEach(function (cell) {
            cell.addEventListener('click', function () {
                if (!this.textContent) {
                    this.textContent = reversePlayerTurn === 'O' ? 'X' : 'O'
                    reversePlayerTurn = this.textContent
                }
                h4namePlayers.innerText = reversePlayerTurn
                if (reversePlayerTurn === 'X') {
                    h4namePlayers.innerText = 'Vez de ' + O + ' (O)'
                } else {
                    h4namePlayers.innerText = 'Vez de ' + X + ' (X)'
                }
            })
        })
        document.getElementById('player').style.display = 'none'
    }
})

document.getElementById("buttonReset").addEventListener('click', function () {
    window.location.reload()
})

document.querySelector('#dark').addEventListener('click', function () {
    document.body.classList.add('dark')
    document.getElementById('dark').style.display = 'none'
    document.getElementById('light').style.display = ''

})
document.querySelector('#light').addEventListener('click', function () {
    document.body.classList.remove('dark')
    document.getElementById('dark').style.display = 'initial'
    document.getElementById('light').style.display = 'none'

})




