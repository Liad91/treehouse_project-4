GameAI = {
  name: 'AIJSV1.0',

  play: function(mode) {
    var boxes = game.boxes;
    var emptyBoxes = [];
    var emptyBoxesNum = [];

    function checkBoard() {
      for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.children.length === 0) {
          emptyBoxes.push(box);
        }
      }
      for (i = 0; i < emptyBoxes.length; i++) {
        var emptyBox = emptyBoxes[i];
        emptyBoxesNum.push(parseInt(emptyBox.id.match(/\d/)[0]));
      }
    }

    function randNum() {
      num = Math.floor(Math.random() * emptyBoxesNum.length);
      return (emptyBoxesNum[num] - 1);
    }

    function getWinOptions(player) {
      var winOptions = [];
      for (var i = 0; i < game.winCombs.length; i++) {
        // Clone game.winCombs
        winOptions[i] = game.winCombs[i].slice(0);
        var winOption = winOptions[i];
        for (var j = 0; j < player.length; j++) {
          if (winOption[0] === player[j]) {
            winOption.splice(0,1);
          } else if (winOption[1] === player[j]) {
            winOption.splice(1,1);
          } else if (winOption[2] === player[j]) {
            winOption.splice(2,1);
          }
        }
      }
      return winOptions;
    }

    function getWinMove(Player1Arr, Player2Arr) {
      var winMove;
      for (var i = 0; i < Player1Arr.length; i++) {
        if (Player1Arr[i].length === 1 && Player2Arr.indexOf(Player1Arr[i][0]) === -1) {
          winMove = (Player1Arr[i][0] - 1);
        }
      }
      return winMove;
    }

    checkBoard();
    var nextMove;
    var checkWinMove;
    if (mode === 'advance' || mode === 'hard') {
      var winOptions = getWinOptions(game.oMoves);
      if (mode === 'hard') {
        if (game.xMoves.length > 0) {
          var playerWinOptions = getWinOptions(game.xMoves);
          checkWinMove = getWinMove(playerWinOptions, game.oMoves);
          if (!isNaN(checkWinMove)) {
            nextMove = checkWinMove;
          }
        }
      }
      if (mode === 'advance' || mode === 'hard') {
        checkWinMove = getWinMove(winOptions, game.xMoves);
        if (!isNaN(checkWinMove)) {
          nextMove = checkWinMove;
        }
      }
      if (isNaN(nextMove)) {
        nextMove = randNum();
      }
    } else if (mode === 'easy'){
      nextMove = randNum();
    }
    setTimeout(function(){boxes[nextMove].click()}, 500);
  }
};