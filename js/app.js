(() => {
    /**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

const btnNewGame = document.querySelector('#new_game');
const btnHit = document.querySelector('#to_hit');
const btnStand = document.querySelector('#to_stand');
const total_cards = document.querySelector('#total_cards');
const player_cards_total = document.querySelector('#player_cards');
const player_pts_total = document.querySelector('#player_pts');
const bot_pts_total = document.querySelector('#bot_pts');
const bot_cards_total = document.querySelector('#bot_cards');
const winner = document.querySelector('#win');
const loser = document.querySelector('#lose');
const push = document.querySelector('#push');

Swal.fire(
    'How to play?',
    'The goal of blackjack is to beat the dealer\'s hand without going over 21. Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand. Each player starts with two cards, one of the dealer\'s cards is hidden until the end. For start the game, click on the button "New Game".',
    'question'
  )


  let deck = [], player_cards = [], bot_cards = [], player_cards_elements = [], player_pts = 0, bot_cards_elements = [], bot_pts = 0,  player_stand = false;

  const newDeck = () => {
      const types = ['C', 'D', 'H', 'S'];
      const specials = ['A', 'J', 'Q', 'K'];
      const deck = [];
  
      for (let i = 2; i <= 10; i++) {
          types.forEach(type => deck.push(i + type));
      }
      
      types.forEach(type => {
          specials.forEach(special => deck.push(special + type));
      });
      return shuffleDeck(deck);
  };
  
  const shuffleDeck = (deck) => {
      const shuffledDeck = [...deck];
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
      return shuffledDeck;
  };

  const pick_a_card = (deck) => {
    if (deck.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomIndex];
        const updatedDeck = deck.filter((_, index) => index !== randomIndex);
        total_cards.innerText = updatedDeck.length;
        return card;
    }
};

const value_card = (card, player_pts) => {
    let value = parseInt(card);
    if (isNaN(value)) {
        card = card.substring(0, 1);
        if (card === 'A') {
            value = (player_pts + 11 < 21) ? 11 : 1;
        } else {
            value = 10;
        }
    }
    return value;
};
const value_first_game = (player_cards, player_pts) => {
    player_cards = player_cards.sort();

    if (player_pts === 21) {
        return player_pts;
    }
    if (player_cards[0].startsWith('A') && player_cards[1].startsWith('A')) {
        return 12;
    }

    for (let card of player_cards) {
        let subs_card = card.substring(0, 1);
        if (subs_card === 'A') {
            player_pts += (player_pts + 11 <= 21) ? 11 : 1;
        } else if (subs_card === 'K' || subs_card === 'Q' || subs_card === 'J') {
            player_pts = 21;
            break;
        } else {
            player_pts += value_card(subs_card, player_pts);
        }
    }
    return player_pts;
};

const dealCardToPlayer = () => {
    const card = pick_a_card(deck);
    player_cards.push(card);
    const cardElement = createCardElement(card);
    player_cards_total.append(cardElement);
};

const dealCardToBot = () => {
    const card = pick_a_card(deck);
    bot_cards.push(card);
    const cardElement = createHiddenCardElement();
    bot_cards_total.append(cardElement);
};

const createCardElement = (card) => {
    const cardElement = document.createElement('img');
    cardElement.setAttribute('src', `./cards/${card}.png`);
    cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
    return cardElement;
};
const createHiddenCardElement = () => {
    const cardElement = document.createElement('img');
    cardElement.setAttribute('src', './back_cards/red_back.png');
    cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
    return cardElement;
};

const disableButtons = () => {
    btnHit.disabled = true;
    btnStand.disabled = true;
    btnHit.classList.replace('opacity-100', 'opacity-50');
    btnStand.classList.replace('opacity-100', 'opacity-50');
};

const calculatePoints = (cards) => {
    let pts = 0;
    for (let card of cards) {
        pts += value_card(card, pts);
    }
    return pts;
};

const newGame = () => {
    player_cards = [];
    bot_cards = [];
    player_cards_total.innerHTML = '';
    bot_cards_total.innerHTML = '';
    player_pts = 0;
    bot_pts = 0;
    bot_pts_total.innerText = 0;
    player_pts_total.innerText = 0;

    btnHit.disabled = false;
    btnStand.disabled = false;
    btnHit.classList.replace('opacity-50', 'opacity-100');
    btnStand.classList.replace('opacity-50', 'opacity-100');
    winner.classList.add('hidden');
    loser.classList.add('hidden');
    push.classList.add('hidden');

    player_stand = false;
    deck = shuffleDeck(newDeck());
    for (let i = 0; i < 2; i++) {
        dealCardToPlayer();
    }
    for (let i = 0; i < 2; i++) {
        dealCardToBot();
    }
    player_pts = calculatePoints(player_cards);
    bot_pts = calculatePoints(bot_cards);
    if (bot_pts === 21 || player_pts === 21) {
        bot_pts_total.innerText = 21;
        if (bot_pts >= 21) {
            loser.classList.remove('hidden');
        }
        if (player_pts >= 21) {
            winner.classList.remove('hidden');
        }
        disableButtons();
        show_bots_cards();
    }
    total_cards.innerText = deck.length;
};

const bot = (pts) => {
    if (pts > 18 && !player_stand) {
        return;
    }
    if (pts <= 18) {
        const card = pick_a_card(deck);
        const cardElement = createHiddenCardElement();
        bot_cards.push(card);
        bot_cards_elements.push(cardElement);
        bot_cards_total.append(cardElement);
        bot_pts += value_card(card, bot_pts);
    }
    if (pts > 18 && player_stand) {
        stand(pts);
    }
    return pts;
};

const show_bots_cards = () => {
    bot_cards_total.innerHTML = '';
    for (const card of bot_cards) {
        const cardElement = createCardElement(card);
        bot_cards_elements.push(cardElement);
        bot_cards_total.append(cardElement);
    }
    bot_pts_total.innerText = bot_pts;
};


const stand = (pts) => {
    if (pts > 19 && pts < 21) {
        show_bots_cards();
    } else {
        while (pts < 18) {
                card = pick_a_card(deck);
                bot_cards.push(card);
                bot_pts += value_card(card, bot_pts);
                pts = bot_pts;
            }
        show_bots_cards();
    }
}


btnNewGame.addEventListener('click', (e) => {
    newGame();
});

btnHit.addEventListener('click', (e) => {
    const card = pick_a_card(deck);
    const cardElement = createCardElement(card);
    player_cards.push(card);
    player_cards_elements.push(cardElement);
    player_cards_total.append(cardElement);
    player_pts += value_card(card, player_pts);
    player_pts_total.innerText = player_pts;
    bot(bot_pts);
    if (player_pts === 21 || (player_pts > 21 && bot_pts > 21) || bot_pts === player_pts) {
        player_stand = true;

        if (player_pts === 21) {
            winner.classList.remove('hidden');
        } else if (player_pts > 21) {
            loser.classList.remove('hidden');
        } else {
            push.classList.remove('hidden');
        }

        disableButtons();
        stand(bot_pts);
        return;
    }
    if (bot_pts > 18 && player_stand) {
        stand(bot_pts);
    }
});


btnStand.addEventListener('click', (e) => {
    player_stand = true;
    btnStand.classList.remove('opacity-100');
    btnHit.classList.remove('opacity-100');
    btnHit.classList.add('opacity-50');
    btnStand.classList.add('opacity-50');
    btnStand.disabled = true;
    btnHit.disabled = true;
    stand(bot_pts);
    if (bot_pts === 21) {
        loser.classList.remove('hidden');
    }
    if (bot_pts > 21) {
        winner.classList.remove('hidden');
    }
    if (bot_pts < 21 && bot_pts > player_pts) {
        loser.classList.remove('hidden');
    }
    if (bot_pts < 21 && bot_pts < player_pts) {
        winner.classList.remove('hidden');
    }
    if (bot_pts < 21 && bot_pts === player_pts) {
        winner.classList.remove('hidden');
    }
    if (bot_pts === player_pts) {
        push.classList.remove('hidden');
    }

});

})()