// http://www.theodinproject.com/courses/javascript-and-jquery/lessons/tic-tac-toe
'use strict';



var tictactoe = (function () {

    ///////////////////////////////////////////////////////////////////////////
    // Object that contains the game board state
    // ...
    // (idea? : structure gameBoardState to be an object with keys as cell ids,
    // and values as X/Os)
    var gameBoardState = [['', '', ''],
                          ['', '', ''],
                          ['', '', '']];





    ///////////////////////////////////////////////////////////////////////////
    // Function that handles clicks, to place moves on the board
    var moveHandler = function (chosenCell) {

        // if the clicked cell is available,
        // then this updates the game board with current move
        var cellCoords = this.id.replace('cell', '').split('-');

        var isCellAvailable = (
            gameBoardState[cellCoords[0]][cellCoords[1]] !== 'X' &&
            gameBoardState[cellCoords[0]][cellCoords[1]] !== 'O' &&
            !winner
        );

        if (isCellAvailable) {
            if (currentPlayerTurn === 'X') {
                gameBoardState[cellCoords[0]][cellCoords[1]] = 'X';
            } else if (currentPlayerTurn === 'O') {
                gameBoardState[cellCoords[0]][cellCoords[1]] = 'O';
            }

            togglePlayerTurn();
            renderGame();
        }

        // if someone won, this displays the winner
        var winCheckResult = checkWinCondition();
        var winner = winCheckResult[0];

        if (winner === 'X') {
            document.getElementById('win-status').innerHTML =
                ('<img class="cat-win" ' +
                    'src="https://raw.githubusercontent.com/davidroberson3/' +
                    'tic-tac-toe-game/master/images/cat-head-gray.jpg"> wins!');
            renderWinCircles(winCheckResult);
            return;

        } else if (winner === 'O') {
            document.getElementById('win-status').innerHTML =
                ('<img class="cat-win" ' +
                    'src="https://raw.githubusercontent.com/davidroberson3/' +
                    'tic-tac-toe-game/master/images/cat-head-orange.jpg"> wins!');
            renderWinCircles(winCheckResult);
            return;
        }

        // if game is a draw, this displays a message
        var isBoardFull = true;

        for (var i = 0; i < gameBoardState.length; i += 1) {
            for (var j = 0; j < gameBoardState[i].length; j += 1) {

                if (gameBoardState[i][j].length === 0) {
                    isBoardFull = false;
                }

            }
        }

        if (isBoardFull) {
            document.getElementById('win-status').innerHTML =
                ('<img class="cat-win" ' +
                    'src="https://raw.githubusercontent.com/davidroberson3/' +
                    'tic-tac-toe-game/master/images/cat-head-gray.jpg">' +
                    ' Cat\'s game! ' +
                    '<img class="cat-win" ' +
                    'src="https://raw.githubusercontent.com/davidroberson3/' +
                    'tic-tac-toe-game/master/images/cat-head-orange.jpg">');
        }

    };





    ///////////////////////////////////////////////////////////////////////////
    // Function that resets the game board state to empty
    var resetGameBoardState = function () {

        gameBoardState = [['', '', ''], ['', '', ''], ['', '', '']];
        currentPlayerTurn = 'X';

        for (var i = 0; i < 3; i += 1) {
            for (var j = 0; j < 3; j += 1) {
                var currentCell = document.getElementById('cell' + i + '-' + j);
                currentCell.classList.remove('X');
                currentCell.classList.remove('O');
                currentCell.classList.remove('cat-head-win');
                currentCell.innerHTML = '';
            }
        }

        document.getElementById('win-status').innerHTML =
            ('<img class="cat-win" ' +
                'src="https://raw.githubusercontent.com/davidroberson3/' +
                'tic-tac-toe-game/master/images/cat-head-gray.jpg">' +
                '\'s turn');

        renderGame();

    };





    ///////////////////////////////////////////////////////////////////////////
    // Function that changes the current player's turn

    var currentPlayerTurn = 'X';

    var togglePlayerTurn = function () {

        if (currentPlayerTurn === 'X') {
            currentPlayerTurn = 'O';
            document.getElementById('win-status').innerHTML =
                ('<img class="cat-win" ' +
                    'src="https://raw.githubusercontent.com/davidroberson3/' +
                    'tic-tac-toe-game/master/images/cat-head-orange.jpg">' +
                    '\'s turn');

        } else {
            currentPlayerTurn = 'X';
            document.getElementById('win-status').innerHTML =
                ('<img class="cat-win" ' +
                    'src="https://raw.githubusercontent.com/davidroberson3/' +
                    'tic-tac-toe-game/master/images/cat-head-gray.jpg">' +
                    '\'s turn');
        }

    };





    ///////////////////////////////////////////////////////////////////////////
    // Function that checks for win conditions,
    // returns 'X', 'O', or false as first index
    // returns winning sequence as second index (i.e. the winCheck index)
    var checkWinCondition = function () {

        // winCheck contains moves of each row/column/diagonal position
        // ['row0','row1','row2',
        //  'col0','col1','col2',
        //  'diag0','diag1']
        var winCheck = ['', '', '',
                        '', '', '',
                        '', ''];

        // checks rows
        for (var i = 0; i < 3; i += 1) {
            for (var j = 0; j < 3; j += 1) {
                if (gameBoardState[i][j] === 'X') {
                    winCheck[i] += 'X';
                } else if (gameBoardState[i][j] === 'O') {
                    winCheck[i] += 'O';
                } else {
                    winCheck[i] += '_';
                }
            }
        }

        // checks columns
        for (var i = 0; i < 3; i += 1) {
            for (var j = 0; j < 3; j += 1) {
                if (gameBoardState[j][i] === 'X') {
                    winCheck[i + 3] += 'X';
                } else if (gameBoardState[j][i] === 'O') {
                    winCheck[i + 3] += 'O';
                } else {
                    winCheck[i + 3] += '_';
                }
            }
        }

        // checks first diagonal (i.e. from top left to bottom right)
        for (var i = 0; i < 3; i += 1) {
            if (gameBoardState[i][i] === 'X') {
                winCheck[6] += 'X';
            } else if (gameBoardState[i][i] === 'O') {
                winCheck[6] += 'O';
            } else {
                winCheck[6] += '_';
            }
        }

        // checks second diagonal (i.e. from top right to bottom left)
        for (var i = 0; i < 3; i += 1) {
            if (gameBoardState[i][2 - i] === 'X') {
                winCheck[7] += 'X';
            } else if (gameBoardState[i][2 - i] === 'O') {
                winCheck[7] += 'O';
            } else {
                winCheck[7] += '_';
            }
        }

        // checks whether a win condition has been met
        for (var i = 0; i < winCheck.length; i += 1) {
            if (winCheck[i] === 'XXX') {
                return ['X', i];
            }
            if (winCheck[i] === 'OOO') {
                return ['O', i];
            }
        }

        // default output
        return [false, -1];

    };





    ///////////////////////////////////////////////////////////////////////////
    // Function that draws circles over top of the winning moves
    var renderWinCircles = function (winCheckResult) {

        // 'X', 'O'
        var winPlayer = winCheckResult[0];

        // ['row0','row1','row2',
        //  'col0','col1','col2',
        //  'diag0','diag1']
        var winIndex = winCheckResult[1];

        var winningCells = [];

        // checks if winning cells are in row0, row1, or row2
        if (winIndex < 3 && winIndex > -1) {
            winningCells.push(document.getElementById(
                'cell' + winIndex + '-' + 0));
            winningCells.push(document.getElementById(
                'cell' + winIndex + '-' + 1));
            winningCells.push(document.getElementById(
                'cell' + winIndex + '-' + 2));
        }

        // checks if winning cells are in col0, col1, or col2
        if (winIndex < 6 && winIndex > 2) {
            winningCells.push(document.getElementById(
                'cell' + 0 + '-' + (winIndex - 3)));
            winningCells.push(document.getElementById(
                'cell' + 1 + '-' + (winIndex - 3)));
            winningCells.push(document.getElementById(
                'cell' + 2 + '-' + (winIndex - 3)));
        }

        // checks if winning cells are in first diagonal
        // (i.e. from top left to bottom right)
        if (winIndex === 6) {
            winningCells.push(document.getElementById(
                'cell' + 0 + '-' + 0));
            winningCells.push(document.getElementById(
                'cell' + 1 + '-' + 1));
            winningCells.push(document.getElementById(
                'cell' + 2 + '-' + 2));
        }

        // checks if winning cells are in second diagonal
        // (i.e. from top right to bottom left)
        if (winIndex === 7) {
            winningCells.push(document.getElementById(
                'cell' + 0 + '-' + 2));
            winningCells.push(document.getElementById(
                'cell' + 1 + '-' + 1));
            winningCells.push(document.getElementById(
                'cell' + 2 + '-' + 0));
        }

        // attaches cat-head-win class to the winning move positions
        for (var j = 0; j < 3; j += 1) {
            // each cell should only have one child node (i.e. the image)
            winningCells[j].childNodes[0].classList.add('cat-head-win');
        }

    };





    ///////////////////////////////////////////////////////////////////////////
    // Function that creates the game board html elements
    var createEmptyGameBoardHTML = function () {

        if (document.getElementById('tictactoe-game-board')) {
            console.log('game board already exists');
            return;
        }

        var gameBoard = document.createElement('div');
        gameBoard.id = 'tictactoe-game-board';

        for (var rowIndex = 0; rowIndex < 3; rowIndex += 1) {

            var currentRow = document.createElement('div');
            currentRow.className = 'tictactoe-row';
            currentRow.id = 'row' + rowIndex;

            for (var cellIndex = 0; cellIndex < 3; cellIndex += 1) {

                var currentCell = document.createElement('div');
                currentCell.className = 'tictactoe-cell';
                currentCell.id = 'cell' + rowIndex + '-' + cellIndex;
                currentCell.addEventListener('click', moveHandler);

                currentRow.appendChild(currentCell);
            }

            gameBoard.appendChild(currentRow);
        }

        document.getElementById('tictactoe-container').appendChild(gameBoard);
        document.getElementById('win-status').innerHTML =
            ('<img class="cat-win" ' +
                'src="https://raw.githubusercontent.com/davidroberson3/' +
                'tic-tac-toe-game/master/images/cat-head-gray.jpg">' +
                '\'s turn');

    };





    ///////////////////////////////////////////////////////////////////////////
    // Function that renders the game board
    var renderGame = function () {

        for (var i = 0; i < 3; i += 1) {
            for (var j = 0; j < 3; j += 1) {

                var currentCell = document.getElementById('cell' + i + '-' + j);
                var moveOfCurrentBoardPosition = gameBoardState[i][j];

                if (moveOfCurrentBoardPosition === 'X') {
                    currentCell.classList.add('X');
                    currentCell.innerHTML =
                        ('<img class="cat-head" ' +
                            'src="https://raw.githubusercontent.com/' +
                            'davidroberson3/tic-tac-toe-game/master' +
                            '/images/cat-head-gray.jpg">');

                } else if (moveOfCurrentBoardPosition === 'O') {
                    currentCell.classList.add('O');
                    currentCell.innerHTML =
                        ('<img class="cat-head" ' +
                            'src="https://raw.githubusercontent.com/' +
                            'davidroberson3/tic-tac-toe-game/master' +
                            '/images/cat-head-orange.jpg">');
                }

            }
        }

    };





    ///////////////////////////////////////////////////////////////////////////
    return {
        resetGameBoardState: resetGameBoardState,
        createEmptyGameBoardHTML: createEmptyGameBoardHTML
    };

})();





///////////////////////////////////////////////////////////////////////////////
// Initialize game
tictactoe.createEmptyGameBoardHTML();
document.getElementById('reset-button').addEventListener(
    'click', tictactoe.resetGameBoardState);
