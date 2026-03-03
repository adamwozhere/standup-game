export function buildDeck<T>(
  numPlayers: number,
  cards: T[],
  specialCards: T[],
): T[] {
  const temp = [];
  for (let i = 0; i < numPlayers - 2; i++) {
    temp.push(cards[i]);
  }
  const deck = [...temp, ...specialCards];
  return shuffle(deck);
}

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  console.log('Shuffled deck:', out);
  return out;
}
