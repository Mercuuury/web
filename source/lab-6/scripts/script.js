function initBoard() {
    let board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let boardCell = document.createElement('div');
        boardCell.classList.add('cell');
        board.append(boardCell);
    }
    return board;
}

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    let row, column, diag1, diag2;

    for (let i = 0; i < 3; i++) {
        row = (cells[i * 3].innerHTML != '');
        column = (cells[i].innerHTML != '');
        diag1 = (cells[0].innerHTML != '');
        diag2 = (cells[2].innerHTML != '');
        for (let j = 0; j < 2; j++) {
            row = row && (cells[i*3+j].innerHTML == cells[i*3+j+1].innerHTML);
            column = column && (cells[j*3+i].innerHTML == cells[(j+1)*3+i].innerHTML);
            diag1 = diag1 && (cells[j*3+j].innerHTML == cells[(j+1)*3+j+1].innerHTML);
            diag2 = diag2 && (cells[j*3+2-j].innerHTML == cells[(j+1)*3+2-(j+1)].innerHTML);
        }
        winner = (row && cells[i * 3].innerHTML) || (column && cells[i].innerHTML) || (diag1 && cells[0].innerHTML) || (diag2 && cells[2].innerHTML);

        if (winner) return winner;
    }
}

let turn = 0;
let steps = 0;
function clickHandler(event) {
    if (event.target.innerHTML != '')
        alert('Эта кнопка занята!');
    else {
        event.target.innerHTML = turn == 0 ? 'O' : 'X';
        turn = (turn + 1) % 2;
        steps++;
        if (turn == 0)
            document.getElementById('turn').innerHTML = 'Ходит ноль';
        else
            document.getElementById('turn').innerHTML = 'Ходит крестик';
    }
    winner = checkWinner();
    if (winner || steps == 9) {
        alert(winner ? `Победитель - ${winner} !` : 'Ничья!');
        alert('Игра окончена.');
    }
        
}

window.onload = function() {
    let board = initBoard();
    board.onclick = clickHandler;
    document.getElementById('turn').innerHTML = 'Ходит ноль';
}

function resetGame() {
    document.querySelectorAll('.cell').forEach(element => {
        element.innerHTML = '';
    });
    steps = 0;
}
