function Game(playerX, playerO, boxes, mode) {
  'use strict';

  this.playerX = playerX;
  this.playerXScore = 0;
  this.playerO = playerO;
  this.playerOScore = 0;
  if (mode) {
    this.mode = mode;
  }
  this.boxes = boxes;
  this.currentMoveIndex = 0;
  this.currentPlayer = '';
  this.xMoves = [];
  this.oMoves = [];
  this.winCombs = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[1,5,9]];
}

Game.prototype.gameOver = function() {
  return this.currentMoveIndex >= this.boxes.length;
};

Game.prototype.score = function(player) {
  if(player === this.playerX) {
    this.playerXScore++;
  } else {
    this.playerOScore++;
  }
};