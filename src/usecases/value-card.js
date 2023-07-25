export const value_card = (card, player_pts) => {
    let value = parseInt(card);
    if (isNaN(value)) { // Ver el primer caracter de la carta
        card = card.substring(0,1)
        if (value === 'A') {
            if (player_pts + 11 < 21) {
                value = 11;
            } else {
                value = 1;
            }
        } else {
            value = 10;
        }
    }
    return value;
};
