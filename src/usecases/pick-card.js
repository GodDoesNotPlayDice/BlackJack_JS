export  const pick_a_card = (deck) => {
    if (deck.length === 0) {
        throw 'Here is no cards in the deck';
    }
    let card = deck[Math.floor(Math.random() * deck.length)];
    deck.splice(deck.indexOf(card),1);
    total_cards.innerText = deck.length;
    return card;
}