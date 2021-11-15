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
let gameover = 0;
function clickHandler(event) {
    if (event.target.innerHTML != '')
        showMessage('Эта кнопка занята!', 'error');
    else if (!gameover){
        event.target.innerHTML = turn == 0 ? 'O' : 'X';
        turn = (turn + 1) % 2;
        steps++;
        if (turn == 0)
            document.getElementById('turn').innerHTML = 'Ходит ноль';
        else
            document.getElementById('turn').innerHTML = 'Ходит крестик';
    }

    if(steps == 9 || gameover) 
        showMessage('Игра окончена.', 'error');

    winner = checkWinner();
    if (winner) {
        showMessage(winner ? `Победитель - ${winner} !` : 'Ничья!');
        gameover = 1;
    }
          
}

function resetGame() {
    document.querySelectorAll('.cell').forEach(element => {
        element.innerHTML = '';
    });
    steps = 0;
    gameover = 0;
}

function showMessage(msg, category = 'success') {
    let msgContainer = document.querySelector('.message');
    let msgElement = document.createElement('div');
    msgElement.classList.add('message');
    msgElement.classList.add(category);
    msgElement.innerHTML = msg;
    msgContainer.append(msgElement);
    setTimeout(() => msgContainer.removeChild(msgContainer.firstChild), 2000); 
}

window.onload = function() {
    let board = initBoard();
    board.onclick = clickHandler;
    document.getElementById('turn').innerHTML = 'Ходит ноль';
}