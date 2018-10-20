
function login() {
var username = document.getElementById('username').value;
var password =  document.getElementById('password').value;
if ((username=='Klee'&& password=='wordsaremagic')||(username=='Mlee' && password=='magicmom')||(username=='Llee'&& password=='deftdad')||(username=='Dlaney'&& password=='hazelunicorn')||(username=='guest'&& password=='writing1')||(username=='jyen'&& password=='humanities102')||(username=='bwhipp'&& password=='humanities64')||(username=='ellabc23'&& password=='readingrules')){
window.location.href='index.html';
}
} 


var CANVAS_SIZE = 600;
var BLOCK_WIDTH = 75;
var BLOCK_HEIGHT = 25;
var PADDLE_WIDTH = 100;
var PADDLE_HEIGHT = 5;
var SCORE_ADD = 100;

var TITLE = 'BREAKOUT!';
var PAUSED = 'PAUSED';
var GAME_OVER = 'GAME OVER!';
var YOU_WIN = 'YOU WIN!';
var SCORE = 'SCORE: ';

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var SPACE_BAR = 32;
var R_KEY = 82;

var score = 0;
var highScores = [];

var nickname = 'Player';
var ballColor = 'black';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = CANVAS_SIZE;
ctx.canvas.height = CANVAS_SIZE;

function startClicked() {
  nickname = document.getElementById('nicknameInput').value;
  document.getElementById('nicknameoutput').innerHTML=nickname;
  ballColor = document.getElementById('ballColorInput').value;
  paused = false;
}

function newBall() {
  return {
    position: {
      x: 5,
      y: 240
    },
    velocity: { // in pixels per second
      x: 100,
      y: 150
    },
    time: Number(new Date()),
    size: 12
  }
}

var ball = newBall()

function newBlocks() {
  return [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
          [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
          [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
          [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
          [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
          [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
          [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
          [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
          [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8],
          [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
          [10,0], [10,1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8],
          [11,0], [11,1], [11, 2], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [11, 8],
          [12,0], [12,1], [12, 2], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8],
          [13,0], [13,1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8],
          [14,0], [14,1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8],
          [15,0], [15,1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8],
          [16,0], [16,1], [16, 2], [16, 3], [16, 4], [16, 5], [16, 6], [16, 7], [16, 8],
          [17,0], [17,1], [17, 2], [17, 3], [17, 4], [17, 5], [17, 6], [17, 7], [17, 8],
          [18,0], [18,1], [18, 2], [18, 3], [18, 4], [18, 5], [18, 6], [18, 7], [18, 8]];
}

var blocks = newBlocks();

var paddle = {
  position: {
    x: 100,
    y: 500
  },
  speed: 15,
  shouldMoveLeft: false,
  shouldMoveRight: false
};

var paused = true;

function clear() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function drawFrame() {
  clear();
  drawBall();
  drawBlocks();
  drawPaddle();
  drawScore();
}

function bound(coord, lower, upper) {
  return Math.max(lower, Math.min(coord, upper));
}

function drawBall() { 
  var now = Number(new Date());
  
  if (paused) {
    ball.time += (now - paused)
    paused = now
  }

  var secondsPassed = (now - ball.time) / 1000;
  var dx = secondsPassed * ball.velocity.x;
  var dy = secondsPassed * ball.velocity.y;
  var x = ball.position.x;
  var y = ball.position.y; 

  ctx.beginPath();
  ctx.rect(x + dx, y + dy, ball.size, ball.size);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.stroke();

  var shouldBounceLeft = x + dx + ball.size > CANVAS_SIZE;
  var shouldBounceRight = x + dx < 0;
  if (shouldBounceLeft || shouldBounceRight) {
    ball.position.x = bound(x + dx, 0, CANVAS_SIZE - ball.size);
    ball.position.y = y + dy;
    ball.time = now;
    ball.velocity.x = -ball.velocity.x;
  }

  var shouldBounceUp = y + dy + ball.size > CANVAS_SIZE;
  var shouldBounceDown = y + dy < 0;
  if (shouldBounceUp || shouldBounceDown ||
      didBreakBlock(x + dx, y + dy) || didHitPaddle(x + dx, y + dy)) {
    ball.position.x = x + dx;
    ball.position.y = bound(y + dy, 0, CANVAS_SIZE - ball.size);
    ball.time = now;
    ball.velocity.y = -ball.velocity.y;
  }

  if (shouldBounceUp) {
    endGame(GAME_OVER);
  }
}

function drawBlocks() {
  var blocksLeft = 0;
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (block) {
      blocksLeft += 1;
      var x = block[1] * BLOCK_WIDTH;
      var y = block[0] * BLOCK_HEIGHT;
      ctx.beginPath();
      ctx.rect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT);
      ctx.fillStyle = pickFillColor(block[0]);
      ctx.fill();
      ctx.stroke();
    }
  }
  if (blocksLeft === 0) {
    endGame(YOU_WIN);
  }
}

function drawScore() {
  document.getElementById('score').innerHTML = SCORE + score;
}

function didBreakBlock(ballX, ballY) {
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (block) {
      var blockX = block[1] * BLOCK_WIDTH;
      var blockY = block[0] * BLOCK_HEIGHT;
      if (blockX < ballX && ballX < blockX + BLOCK_WIDTH &&
          blockY > ballY - BLOCK_HEIGHT) {
        blocks[i] = null;
        score += SCORE_ADD;
        return true;
      }
    }
  }
  return false;
}

function pickFillColor(n) {
  if (n === 0) {
    return 'darkblue';
  } else if (n === 1) {
    return 'blue'
  } else if (n === 2) {
    return 'blueviolet';
  } else if (n === 3) {
    return 'cadetblue';
  } else if (n === 4) {
    return 'cornflowerblue';
  } else if (n === 5) {
    return 'dodgerblue';
  } else if (n === 6) {
    return 'darkturquoise';
  } else if (n === 7) {
    return 'deepskyblue';
  } else if (n === 8) {
    return 'skyblue';
  } else if (n === 9) {
    return 'fuchsia';
  } else if (n === 10) {
    return 'darkmagenta';
  } else if (n === 11) {
    return 'darkorchid';
  } else if (n === 12) {
    return 'lightseagreen';
  } else if (n === 13) {
    return 'seagreen';
  } else if (n === 14) {
    return 'lightgreen';
  } else if (n === 15) {
    return 'slateblue';
  } else if (n === 16) {
    return 'lightslateblue';
  } else if (n === 17) {
    return 'darkslateblue';
  } else if (n === 18) {
    return 'lemonchiffon';
  }
  
}

function drawPaddle() {
  if (paddle.shouldMoveLeft) {
    paddle.position.x -= paddle.speed;
    paddle.shouldMoveLeft = false;
  } else if (paddle.shouldMoveRight) {
    paddle.position.x += paddle.speed;
    paddle.shouldMoveRight = false;
  }

  ctx.beginPath();
  ctx.rect(paddle.position.x, paddle.position.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillStyle = 'aqua';
  ctx.fill();
  ctx.stroke();
}

function didHitPaddle(ballX, ballY) {
  return paddle.position.x < ballX &&
         ballX < paddle.position.x + PADDLE_WIDTH &&
         paddle.position.y < ballY + ball.size &&
         ball.velocity.y > 0;
}

function endGame(message) {
  if (window.title.innerHTML === TITLE) {
    ball.velocity.y = 0
    ball.velocity.x = 0
    window.title.innerHTML = message;

    highScores += score;
    var el = document.createElement('h2');
    el.innerHTML = nickname + ': ' + score;
    document.getElementById('highScores').appendChild(el);
  }
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
  case LEFT_ARROW:
    paddle.shouldMoveLeft = true;
    break;
  case RIGHT_ARROW:
    paddle.shouldMoveRight = true;
    break;
  case SPACE_BAR:
    var title = window.title.innerHTML;
    if (title === TITLE) {
      window.title.innerHTML = PAUSED;
      paused = Number(new Date())
    } else {
      window.title.innerHTML = TITLE;
      paused = false;
    }
    break;
  case R_KEY:
    window.title.innerHTML = TITLE;
    ball = newBall();
    blocks = newBlocks();
    score = 0;
    break;
  }
};

var motion = (function () {
  var i = 0;
  return {
    start: () => {
      i = setInterval(drawFrame, 10);
    },
    stop: () => {
      clearInterval(i);
    }
  }
})();

motion.start();



