let isGameOver = false;
let position = 0;
let isJumping = false;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
  else if (event.keyCode === 13) {
    if (isGameOver) {
      startGame();
    }
  }
}

function startGame() {
  isGameOver = false;
  position = 0;
  isJumping = false;

  document.body.innerHTML = `<div class="background">
                               <div class="dino"></div>
                             </div>`;

  dino = document.querySelector('.dino');
  background = document.querySelector('.background');
  createCactus();
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {

    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      background.removeChild(cactus);
      isGameOver = true;
      document.body.innerHTML = `<h1 class="game-over">Game Over!😅</h1>
                                 <h2 class="game-over">
                                   Pressione a tecla Enter para jogar novamente
                                 </h2>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

startGame();
document.addEventListener('keyup', handleKeyUp);
