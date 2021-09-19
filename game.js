const gameSumary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: '',
  aiHand: '',
};

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {
  game.playerHand = this.dataset.option;
  console.log(game.playerHand);
  hands.forEach((hand) => (hand.style.boxShadow = ''));
  this.style.boxShadow = '0 0 0 5px red';
}

function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
  if (player === ai) {
    console.log('remis');
    return 'draw';
  } else if (
    (player === 'papier' && ai === 'kamień') ||
    (player === 'kamień' && ai === 'nożyczki') ||
    (player === 'nożyczki' && ai === 'papier')
  ) {
    console.log('Wygrałeś');
    return 'win';
  } else {
    console.log('Przegrałeś');
    return 'loss';
  }
}
//publikacja wyników
function publishResult(player, ai, resalut) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;

  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.querySelector('p.numbers span').textContent = ++gameSumary.numbers;

  if (resalut === 'win') {
    document.querySelector('p.wins span').textContent = ++gameSumary.wins;
    const win = document.querySelector('[data-summary="who-win"]');
    win.textContent = 'Ty wygrałeś';
    win.style.color = 'green';
  } else if (resalut === 'loss') {
    document.querySelector('p.losses span').textContent = ++gameSumary.losses;
    const loss = document.querySelector('[data-summary="who-win"]');
    loss.textContent = 'Komputer wygrał';
    loss.style.color = 'red';
  } else {
    document.querySelector('p.draws span').textContent = ++gameSumary.draws;
    const draws = document.querySelector('[data-summary="who-win"]');
    draws.textContent = 'Remis';
    draws.style.color = 'gray';
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    '';
  game.playerHand = '';
}

function startGame() {
  if (!game.playerHand) {
    return alert('Wybierz dłoń');
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener('click', handSelection));

document.querySelector('.start').addEventListener('click', startGame);
