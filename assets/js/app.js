var PLAYER = "X";
var computerAI = "O";
var BLANK = "_";
var ONEPLAYER = true;
var currentTurn = PLAYER;
var currentGame;
var freeCellCount = 9;
var boxes;
var cs;
window.onload = () => {
    $(".board").hide();
}
$(function () {
    $(".board").hide();
    prepare();
});



function prepare() {
    reset();
    initCurrentGame();
    initcomputerAIGameBoard();
    clearBoard();
}

$(".reset-game").click(function () {
    $(".board").hide();
    reset();
    resetGame();
    $(".choose_type_display").css("z-index", "7");
    $(".choose_player_display").css("z-index", "6");
    $(".player1Score").text("0");
    $(".player2Score").text("0");
});

$(".choseType").click(function () {
    $(".choose_type_display").css("z-index", "1");
});

$(".choseTypePLayer2").click(function () {
    $(".player2display").text("Player 2");
    $(".player1display").text("Player 1");
    ONEPLAYER = false;
});

$(".choseTypeComputer").click(function () {
});

$(".chosePlayer").click(function () {
    $(".choose_player_display").css("z-index", "1");
    $(".board").show();
});

$(".chosePlayerO").click(function () {

    function aiStart() {
        PLAYER = "O";
        computerAI = "X";
        currentTurn = computerAI;
    }
    if (ONEPLAYER == true) {
        aiStart();
        setTimeout(function () {
            computerAITurn();
        }, 1000);
    }


});


$(".chosePlayerX").click(function () {
    PLAYER = "X";
    computerAI = "O";
});

function swapTurn() {
    if (currentTurn == PLAYER) {
        currentTurn = computerAI;
    } else {
        currentTurn = PLAYER;
    }
}

function determine(gameBoard) {
    for (var i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i][0] == gameBoard[i][1] &&
            gameBoard[i][1] == gameBoard[i][2]) {
            if (gameBoard[i][0] != BLANK) {
                return gameBoard[i][0];
            }
        }
    }

    for (var j = 0; j < gameBoard[0].length; j++) {
        if (gameBoard[0][j] == gameBoard[1][j] &&
            gameBoard[1][j] == gameBoard[2][j]) {
            if (gameBoard[0][j] != BLANK) {
                return gameBoard[0][j];
            }
        }
    }

    if ((gameBoard[0][0] == gameBoard[1][1] &&
        gameBoard[1][1] == gameBoard[2][2]) ||
        (gameBoard[0][2] == gameBoard[1][1] &&
            gameBoard[1][1] == gameBoard[2][0])) {
        if (gameBoard[1][1] != BLANK) {
            return gameBoard[1][1];
        }
    }

    if (freeCellCount == 0) {
        return "draw";
    }
    return "notend";
}


function AI() {

    swapTurn();
    if (ONEPLAYER == true) {
        if (currentTurn == computerAI) {
            computerAITurn();
        }
    }
}

function checkwin() {
    var winner = determine(currentGame);
    if (winner != "notend") {

        if (winner == "draw") {
            setTimeout(function () {
                $(".board_display").css("z-index", "4");
                $(".remark").text("draw");
            }, 1000);

        } else {
            $(".board_display").css("z-index", "4");

            if (winner == PLAYER) {
                setTimeout(function () {
                    var num = Number($(".player1Score").text());
                    $(".player1Score").text(num + 1);
                    var winnersName = $(".player1display").text();
                    $(".remark").text(winnersName + " Wins !!!");
                }, 1000);
            } else {
                setTimeout(function () {

                    var num = Number($(".player2Score").text());
                    $(".player2Score").text(num + 1);
                    var winnersName = $(".player2display").text();
                    $(".remark").text(winnersName + " Wins !!!");
                }, 2000);
            }


        }

        function doing() {
            setTimeout(frame1, 1000);
        }


        function frame1() {
            $(".board_display").css("z-index", "1");
            resetGame();
            clearTimeout();
        }

        function frame() {
            $(".board_display").css("z-index", "1");
            clearInterval();
        }

        doing();
        return true;
    }
}

function setSign(row, col) {
    setTimeout(() => {
        var pos = row * 3 + col + 1;
        var box = "#box" + pos;
        $(box).text(currentTurn);
        $(box).attr("disabled", true);
        $(box).addClass("checked-btn");
        $(".board_display").css("z-index", "1");
        swapTurn();
        var y = checkwin();
    }, 1000);
}

function clearBoard() {
    boxes = $(".small-box");
    console.log(boxes);
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
    }
}

function initCurrentGame() {
    currentGame = new Array(3);
    for (var i = 0; i < currentGame.length; i++) {
        currentGame[i] = new Array(3);
        for (var j = 0; j < currentGame[i].length; j++) {
            currentGame[i][j] = BLANK;
        }
    }
}

function resetGame() {


    reset();
    freeCellCount = 9;
    initCurrentGame();
    initcomputerAIGameBoard();
}

var computerAIGameBoard;
var computerAICurrentTurn;

function swapcomputerAITurn() {
    if (computerAICurrentTurn == computerAI) {
        computerAICurrentTurn = PLAYER;
    } else {
        computerAICurrentTurn = computerAI;
    }
}

function initcomputerAIGameBoard() {

    computerAIGameBoard = new Array(3);

    for (var i = 0; i < computerAIGameBoard.length; i++) {
        computerAIGameBoard[i] = new Array(3);
    }

}

function copyGameBoard() {

    for (var i = 0; i < computerAIGameBoard.length; i++) {

        for (var j = 0; j < computerAIGameBoard[i].length; j++) {

            computerAIGameBoard[i][j] = currentGame[i][j];
        }

    }

}

function computerAITurn() {
    // $(".board_display").css("z-index", "4");
    // $(".remark").text("Computer is thinking");
    if (currentTurn != computerAI) return;
    if (freeCellCount == 0) return;

    copyGameBoard();
    computerAICurrentTurn = computerAI;
    var res, ci, cj, choose = -1000;
    for (var i = 0; i < computerAIGameBoard.length; i++) {
        for (var j = 0; j < computerAIGameBoard[i].length; j++) {
            if (computerAIGameBoard[i][j] == BLANK) {
                computerAIGameBoard[i][j] = computerAICurrentTurn;
                freeCellCount--;
                swapcomputerAITurn();
                res = search(1);
                computerAIGameBoard[i][j] = BLANK;
                freeCellCount++;
                if (choose == -1000) {
                    choose = res;
                    ci = i;
                    cj = j;
                } else if (res > choose) {
                    choose = res;
                    ci = i;
                    cj = j;
                }
                swapcomputerAITurn();
            }
        }
    }
    currentGame[ci][cj] = computerAI;
    freeCellCount--;
    setSign(ci, cj);


}

function search(level) {
    var res = determine(computerAIGameBoard);
    if (res == computerAI) {
        return 100 - level;
    } else if (res == PLAYER) {
        return level - 100;
    } else if (res == "draw") {
        return 0;
    }

    var choose = -1000;
    var temp;

    for (var i = 0; i < computerAIGameBoard.length; i++) {
        for (var j = 0; j < computerAIGameBoard[i].length; j++) {
            if (computerAIGameBoard[i][j] == BLANK) {
                computerAIGameBoard[i][j] = computerAICurrentTurn;
                swapcomputerAITurn();
                freeCellCount--;
                temp = search(level + 1);
                swapcomputerAITurn();
                computerAIGameBoard[i][j] = BLANK;
                freeCellCount++;
                if (choose == -1000) {
                    choose = temp;
                } else if (computerAICurrentTurn == computerAI) {
                    if (temp > choose) choose = temp;
                } else if (computerAICurrentTurn == PLAYER) {
                    if (temp < choose) choose = temp;
                }
            }
        }
    }
    return choose;
}

function frame() {
    AI();
    clearTimeout(cs);
}

$("#box1").click(function () {

    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[0][0] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {

        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box2").click(function () {

    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[0][1] = currentTurn;

    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {

        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box3").click(function () {

    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[0][2] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {

        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box4").click(function () {

    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[1][0] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {
        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box5").click(function () {
    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[1][1] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {
        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box6").click(function () {
    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[1][2] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {

        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box7").click(function () {
    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[2][0] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {
        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box8").click(function () {
    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[2][1] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {

        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});
$("#box9").click(function () {

    $(this).text(currentTurn);
    freeCellCount--;
    currentGame[2][2] = currentTurn;
    $(this).attr("disabled", true); $(this).addClass('checked-btn');
    var cw = checkwin();
    if (cw) {
        cs = setTimeout(frame, 1000);
    } else {
        AI();
    }
});

function reset() {

    $("#box1").removeAttr("disabled");
    $("#box2").removeAttr("disabled");
    $("#box3").removeAttr("disabled");
    $("#box4").removeAttr("disabled");
    $("#box5").removeAttr("disabled");
    $("#box6").removeAttr("disabled");
    $("#box7").removeAttr("disabled");
    $("#box8").removeAttr("disabled");
    $("#box9").removeAttr("disabled");

    $("#box1").removeClass("checked-btn");
    $("#box2").removeClass("checked-btn");
    $("#box3").removeClass("checked-btn");
    $("#box4").removeClass("checked-btn");
    $("#box5").removeClass("checked-btn");
    $("#box6").removeClass("checked-btn");
    $("#box7").removeClass("checked-btn");
    $("#box8").removeClass("checked-btn");
    $("#box9").removeClass("checked-btn");

    $("#box1").text("");
    $("#box2").text("");
    $("#box3").text("");
    $("#box4").text("");
    $("#box5").text("");
    $("#box6").text("");
    $("#box7").text("");
    $("#box8").text("");
    $("#box9").text("");
}
