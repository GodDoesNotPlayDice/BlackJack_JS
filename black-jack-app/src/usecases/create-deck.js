/**
 * 
 * @returns {Array} deck
 * @description Create a new deck of cards and shuffle it
 */

export const newDeck = () => {
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