var game;

Render.render(Render.start());
var error = document.createElement('p');
error.id = 'error';

function getGameClass() {
  return document.querySelector('.game');
}

function reload() {
  location.reload();
}

function selectButtons() {
  return document.getElementsByTagName('button');
}

function getBoxes() {
  return document.getElementsByClassName('box');
}

function enableStart(player1, player2) {
  var canStart = false;

  function validName(input) {
    var val = input.value;
    return  val !== '' && isNaN(val) && val.length > 1 && val.length < 9;
  }

  if (player2) {
    if (validName(player1) && validName(player2)) {
      canStart = true;
    } else {
      error.innerHTML = '*Please enter valid names';
      getGameClass().appendChild(error);
    }
  } else {
    if (validName(player1)) {
      canStart = true;
    } else {
      error.innerHTML = '*Please enter valid name';
      getGameClass().appendChild(error);
    }
  }
  return canStart;
}

var buttons = selectButtons();

buttons[0].onclick = function() {
  Render.render(Render.multiplayer(), getGameClass());
  var player1 = document.getElementById('player1name');
  var player2 = document.getElementById('player2name');
  buttons =  selectButtons();
  buttons[0].onclick = function() {
    reload();
  };

  buttons[1].onclick = function() {
    if(enableStart(player1,player2)) {
      Render.render(Render.game());
      game = new Game(player1.value, player2.value, getBoxes());
      GameUI.checkStatus();
    }
  };
};

buttons[1].onclick = function() {
  Render.render(Render.single(), getGameClass());
  var player1 = document.getElementById('player1name');
  var level = document.getElementsByClassName('level');
  var selectedMode;
  for (var i = 0; i < level.length; i++) {
    level[i].addEventListener('click', levelClickHandler);
  }
  level[0].click();
  function levelClickHandler() {
    for (var i = 0; i < level.length; i++) {
      if (level[i].style.background !== '') {
        level[i].style.background = '';
      }
    }
    this.style.background = 'url("img/v.svg") center center / 20px 20px no-repeat #fff';
    selectedMode = this.id;
  }
  buttons = selectButtons();
  buttons[0].onclick = function() {
    reload();
  };

  buttons[1].onclick = function() {
    if(enableStart(player1)) {
      Render.render(Render.game());
      game = new Game(player1.value, GameAI.name, getBoxes(), selectedMode);
      GameUI.checkStatus();
    }
  };
};

