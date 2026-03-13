import { useState } from 'react';

type Card = {
  title: string;
  description: string;
  image?: object;
  effect?: string; // e.g., GET OUT JAIL FREE
  special?: 'HOST' | 'QUOTE';
};

type CardType = 'chance' | 'community-chest';

export function useCards(numPlayers: number, cards: Card[], specialCards: Card[]) {
  // build the decks

  const [deck, setDeck] = useState<Card[][]>(() => buildDecks(numPlayers, cards, specialCards));

  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const drawCard = (type: CardType) => {
    const deckIndex = type === 'chance' ? 0 : 1;
    const chosenCard = deck[deckIndex][deck[deckIndex].length - 1];
    setDeck((prev) => {
      const updatedDeck = [...prev];
      updatedDeck[deckIndex] = updatedDeck[deckIndex].slice(0, -1);
      return updatedDeck;
    });
    setCurrentCard(chosenCard);
  };

  const removeCard = () => {
    let pile = deck[0].length > deck[1].length ? 0 : 1;

    for (let i = 0; i < deck[pile].length; i++) {
      const card = deck[pile][i];
      if (!card.special) {
        setDeck((prev) => {
          const updatedDeck = [...prev];
          updatedDeck[pile] = prev[pile].filter((_, index) => index !== i);
          return updatedDeck;
        });
        return true;
      }
    }

    pile = pile++ % 2;

    for (let i = 0; i < deck[pile].length; i++) {
      const card = deck[pile][i];
      if (!card.special) {
        setDeck((prev) => {
          const updatedDeck = [...prev];
          updatedDeck[pile] = prev[pile].filter((_, index) => index !== i);
          return updatedDeck;
        });
        return true;
      }
    }

    return false;
  };

  const discardCard = () => {
    setCurrentCard(null);
  };

  return {
    deck,
    drawCard,
    currentCard,
    setCurrentCard,
    discardCard,
    removeCard,
  };
}

function buildDecks<T>(numPlayers: number, cards: T[], specialCards: T[]): T[][] {
  const temp = [];
  for (let i = 0; i < numPlayers - specialCards.length; i++) {
    temp.push(cards[i]);
  }
  const deck = [...temp, ...specialCards];
  const shuffled = shuffle(deck);

  const output: T[][] = [[], []];

  for (let i = 0; i < shuffled.length; i++) {
    const deckIndex = i % 2; // Alternate between two decks
    output[deckIndex].push(shuffled[i]);
  }
  console.log('Built decks:', output);
  return output;
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
