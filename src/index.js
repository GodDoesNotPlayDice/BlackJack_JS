import { newDeck, pick_a_card, value_card } from './usecases';
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
  
  
  let deck = [];
  
  let player_cards = [];
  let player_cards_elements = [];
  let player_pts = 0;
  
  let bot_cards = [];
  let bot_cards_elements = [];
  let bot_pts = 0;
  
  let player_stand = false;
  


const value_first_game = (player_cards, player_pts, who) => {
    player_cards = player_cards.sort();
    for (let card of player_cards ) {
        if (player_pts === 21) {
            break;
        } else if ('A' === player_cards[0].substring(0,1) && 'A' === player_cards[1].substring(0,1)) {
            player_pts = 12;
            break;
        }

        let subs_card_one = card.substring(0,1)
        if (subs_card_one === 'A') {
            for (let card of player_cards) {
                let subs_card = card.substring(0,1)
                if (subs_card_one === subs_card) {
                    continue
                }
                if (subs_card === 'K' ||subs_card === 'Q' || subs_card === 'J' ) {
                    player_pts = 21;
                    break;
                } else {
                    player_pts += value_card(subs_card_one, player_pts);
                }
            }
        } else {
            player_pts += value_card(card, player_pts);
        }
        
    }
    return player_pts;

};


const newGame = () => {
    while (player_cards_total.firstChild) {
        player_cards_total.removeChild(player_cards_total.firstChild);
      }
    while (bot_cards_total.firstChild) {
        bot_cards_total.removeChild(bot_cards_total.firstChild);
    }
    deck = newDeck();
    if (!winner.classList.contains('hidden'))
        winner.classList.add('hidden');
    if (!loser.classList.contains('hidden')) {
        loser.classList.add('hidden');
    }
    if (!push.classList.contains('hidden')) {
        push.classList.add('hidden');
    }

    if (btnHit.classList.contains('opacity-50')) {
        btnHit.classList.replace('opacity-50', 'opacity-100');
    }
    if (btnStand.classList.contains('opacity-50')) {
        btnStand.classList.replace('opacity-50', 'opacity-100');
    }

    btnHit.disabled = false;
    btnStand.disabled = false;
    
    
    player_stand = false;
    player_cards = [];
    bot_cards = [];

    player_pts = 0;
    bot_pts = 0;
    bot_pts_total.innerText = 0;

    player_cards_elements = [];
    bot_cards_elements = [];

    for (let i = 0; i < 2; i++) {
        let card = pick_a_card(deck);
        const cardElement = document.createElement('img');
        cardElement.setAttribute('src', `../cards/${card}.png`);
        player_cards.push(card);
        cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
        player_cards_elements.push(cardElement);
        for (let card of player_cards_elements) {
            player_cards_total.append(card);
        }
    }

    for (let i = 0; i < 2; i++) {
        let card = pick_a_card(deck);
        bot_cards.push(card);
        const cardElement = document.createElement('img');
        cardElement.setAttribute('src', `./back_cards/red_back.png`);
        cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
        bot_cards_elements.push(cardElement);
        for (let card of bot_cards) {
            bot_cards_total.append(cardElement);
        }

    }
    player_pts = value_first_game(player_cards, player_pts, 'Player');
    bot_pts = value_first_game(bot_cards, bot_pts, 'Bot');

    if (bot_pts >= 21) {
        bot_pts_total.innerText = 21;
        loser.classList.remove('hidden');

        btnStand.classList.remove('opacity-100');
        btnHit.classList.remove('opacity-100');
        btnHit.classList.add('opacity-50');
        btnStand.classList.add('opacity-50');
        btnHit.disabled = true;
        btnStand.disabled = true;
        show_bots_cards();
    }

    if (player_pts >= 21) {
        player_stand = true;
        winner.classList.remove('hidden');
        btnStand.classList.remove('opacity-100');
        btnHit.classList.remove('opacity-100');
        btnHit.classList.add('opacity-50');
        btnStand.classList.add('opacity-50');
        btnHit.disabled = true;
        btnStand.disabled = true;
        show_bots_cards();
    }

    player_pts_total.innerText = player_pts;
    total_cards.innerText = deck.length;
}


// Continuar con el bot.
const bot = (pts) => {
    if (pts > 18) {
        if (player_stand === false) {
            return;
        }
        else {stand(pts);}
    } else {
        let card = pick_a_card(deck);
        const cardElement = document.createElement('img');
        cardElement.setAttribute('src', `./back_cards/red_back.png`);
        cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
        bot_cards_elements.push(cardElement);
        bot_cards_total.append(cardElement);
        bot_cards.push(card);
        bot_pts += value_card(card, bot_pts); 
        return pts;
    }
};

const show_bots_cards = () => {
    while (bot_cards_total.firstChild) {
        bot_cards_total.removeChild(bot_cards_total.firstChild);
    }
    for (let card of bot_cards) {
        const cardElement = document.createElement('img');
        cardElement.setAttribute('src', `./cards/${card}.png`);
        cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
        bot_cards_elements.push(cardElement);
        bot_cards_total.append(cardElement);
    }
    bot_pts_total.innerText = bot_pts;
}

const stand = (pts) => {
    if (pts > 19 && pts < 21) {
        show_bots_cards();
    } else {
        while (pts < 18) {
                let card = pick_a_card(deck);
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
    const cardElement = document.createElement('img');
    let card = pick_a_card(deck);
    cardElement.setAttribute('src', `./cards/${card}.png`);
    cardElement.classList.add('w-20', 'lg:w-28', 'relative', 'left-28', '-ml-16');
    player_cards_elements.push(cardElement);
    player_pts += value_card(card, player_pts);
    player_cards_total.append(cardElement);
    player_pts_total.innerText = player_pts;
    bot(bot_pts);

    if (player_pts === 21) {
        player_stand = true;
        winner.classList.remove('hidden');
        btnStand.classList.remove('opacity-100');
        btnHit.classList.remove('opacity-100');
        btnHit.classList.add('opacity-50');
        btnStand.classList.add('opacity-50');
        btnHit.disabled = true;
        btnStand.disabled = true;
        stand(bot_pts);
        return;
    } else if (bot_pts > 21 && player_pts > 21) {
        player_stand = true;
        push.classList.remove('hidden');
        btnHit.classList.replace('opacity-100', 'opacity-50');
        btnHit.disabled = true;
        btnStand.classList.replace('opacity-100', 'opacity-50');
        btnStand.disabled = true;
        stand(bot_pts);
        return;

    } else if (bot_pts === player_pts) {
        player_stand = true;
        push.classList.remove('hidden');
        btnStand.classList.remove('opacity-100');
        btnHit.classList.remove('opacity-100');
        btnHit.classList.add('opacity-50');
        btnStand.classList.add('opacity-50');
        btnHit.disabled = true;
        btnStand.disabled = true;
        stand(bot_pts);
        return;
    } else if (player_pts > 21) {
        player_stand = true;
        loser.classList.remove('hidden');
        btnStand.classList.remove('opacity-100');
        btnHit.classList.remove('opacity-100');
        btnHit.classList.add('opacity-50');
        btnStand.classList.add('opacity-50');
        btnHit.disabled = true;
        btnStand.disabled = true;
        stand(bot_pts);
        return;
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

})
  })()