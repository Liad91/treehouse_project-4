var GameUI = {

  checkStatus: function() {
    if(game.gameOver()) {
      this.winnerScreen();
    } else if (game.currentMoveIndex === 0) {
      this.startGame();
    } else {
      this.play();
    }
  },

  startGame: function() {
    var rand = Math.floor(Math.random() * 2) + 1;
    var player1 = document.getElementById('player1-name');
    var player2 = document.getElementById('player2-name');
    player1.innerHTML = game.playerX + ' (' + game.playerXScore + ')';
    if (game.playerO === GameAI.name) {
      player2.innerHTML = 'Computer (' + game.playerOScore + ')';
    } else {
      player2.innerHTML = game.playerO + ' (' + game.playerOScore + ')';
    }
    rand === 1 ? game.currentPlayer = game.playerX : game.currentPlayer = game.playerO;
    this.play();
  },

  play: function() {
    var playerX = 'player1';
    var xImg = '#EFEFEF url("img/x.svg") center no-repeat';
    var xHead = document.getElementById(playerX);
    var xSvg = xHead.innerHTML;
    var xBcakground = '#FFA000';
    var playerO = 'player2';
    var oImg = '#EFEFEF url("img/o.svg") center no-repeat';
    var oHead = document.getElementById(playerO);
    var oSvg = oHead.innerHTML;
    var oBcakground = '#3688C3';
    var boxes = game.boxes;
    var board = document.querySelector('.board');
    var cover = document.createElement('div');

    function isEmpty(object) {
      return object.children.length === 0;
    }

    function playerXTurn() {
      return game.currentPlayer === game.playerX;
    }

    function boxHoverHandler(){
      var img;
      if(isEmpty(this)) {
        if (playerXTurn()) {
          img = xImg;
        } else {
          img = oImg;
        }
        this.style.background = img;
        this.style.backgroundSize = '100px 100px';
      }
    }

    function boxLeaveHandler() {
      if(isEmpty(this)) {
        this.style.background = '#EFEFEF';
        this.style.boxShadow = 'none';
      }
    }

    function boxFocusHandler() {
      if(isEmpty(this)) {
        this.style.boxShadow = '0 0 6px 1px rgba(0,0,0,0.6)';
      } 
    }

    function boxClickHandler() {
      var background;
      var svg;
      var array;

      if(isEmpty(this)) {
        if (playerXTurn()) {
          background = xBcakground;
          svg = xSvg;
          array = game.xMoves;
        } else {
          background = oBcakground;
          svg = oSvg;
          array = game.oMoves;
        }
        this.style.background = background;
        this.style.cursor = 'default';
        this.style.boxShadow = '0 0 6px 1px rgba(0,0,0,0.6)';
        this.innerHTML = svg;

        array.push(parseInt(this.id.match(/\d/)[0]));
        if (checkCombs(array)) {
          game.score(game.currentPlayer);
          GameUI.winnerScreen(game.currentPlayer);
        } else {
          switchTurn();
          game.currentMoveIndex++;
          GameUI.checkStatus();
        }
      }
    }

    function switchTurn(){
      game.currentPlayer === game.playerX ? game.currentPlayer = game.playerO : game.currentPlayer = game.playerX;
    }

    function checkCombs(playerArr) {
      var winner = false;
      for (var i = 0; i < game.winCombs.length; i++) {
        var winComb = game.winCombs[i];
        for (var j = 0; j < playerArr.length; j++) {
          if (winComb[0] === playerArr[j]) {
            for (j = 0; j < playerArr.length; j++) {
              if (winComb[1] === playerArr[j]) {
                for (j = 0; j < playerArr.length; j++) {
                  if (winComb[2] === playerArr[j]) {
                    winner = true;
                  }
                }
              }
            }
          }
        }
      }
      return winner;
    }

    if (game.currentMoveIndex === 0) {
      for (var i = 0; i < game.boxes.length; i++) {
        var box = game.boxes[i];
        box.addEventListener('mouseover', boxHoverHandler);
        box.addEventListener('mouseleave', boxLeaveHandler);
        box.addEventListener('mousedown', boxFocusHandler);
        box.addEventListener('click', boxClickHandler);
      }
    } 
    if(playerXTurn()) {
      oHead.classList.remove('active');
      xHead.classList.add('active');
    } else {
      xHead.classList.remove('active');
      oHead.classList.add('active');
    }

    if(game.currentPlayer === GameAI.name){
      cover.id = 'cover';
      board.appendChild(cover);
      GameAI.play(game.mode);
    } else {
      var div = document.getElementById('cover');
      if (div) {
        board.removeChild(div);
      }
    }
  },

  winnerScreen: function(winner) {

    Render.render(Render.gameOver(winner));
    var buttons = document.querySelectorAll('.button');
    buttons[0].addEventListener('click', this.startOver);
    buttons[1].addEventListener('click', reload);
  },

  startOver: function() {
    game.currentMoveIndex = 0;
    game.xMoves = [];
    game.oMoves = [];
    Render.render(Render.game());
    game.boxes = getBoxes();
    
    GameUI.startGame();
  },
};