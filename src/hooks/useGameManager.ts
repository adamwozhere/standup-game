import { useState } from 'react';
import { buildDeck } from '../utils/shuffle';

type Phase = 'setup' | 'idle' | 'picking' | 'revealed' | 'gameover';
// rolled, skipped, picking, cardRevealed?

type Card = {
  title: string;
  description: string;
  image?: object;
  effect?: string; // e.g., GET OUT JAIL FREE
  special?: 'HOST' | 'QUOTE';
};

type Winners = {
  host: string;
  quote: string;
};

// start game
// rollDice
// skipPlayer
// confirmTurn
// pickCard
// dismissCard
// endGame
// undoTurn

export function useGameManager() {
  console.log('useGameManager');
  const [phase, setPhase] = useState<Phase>('setup');
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [deck, setDeck] = useState<Card[][]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [winners, setWinners] = useState<Winners>({ host: '', quote: '' });

  const currentPlayerName = currentPlayer !== null ? players[currentPlayer] : null;
  console.log('currentPlayerName', currentPlayerName);

  const startGame = (players: string[], cards: Card[][]) => {
    if (phase !== 'setup') return;

    console.log('startGame');
    const newDeck = buildDeck(players.length, cards[0], cards[1]);
    const halfway = Math.ceil(newDeck.length / 2);
    console.log();
    const pile1 = newDeck.slice(0, halfway);
    const pile2 = newDeck.slice(halfway, newDeck.length);
    console.log('pile1', pile1);
    console.log('pile2', pile2);
    setPlayers(players);
    setDeck([pile1, pile2]);
    setPhase('idle');
  };

  const rollDice = () => {
    console.log('rollDice', phase);
    if (phase !== 'idle') return;
    console.log('rolling');

    const randomPlayer = Math.floor(Math.random() * players.length);
    console.log('rolled player:', randomPlayer, players[randomPlayer]);
    setCurrentPlayer(randomPlayer);
    // setPeople(people.filter((_, index) => index !== randomPerson));
    setPhase('picking');
  };

  const pickCard = (type: 'chance' | 'communityChest') => {
    if (phase !== 'picking') return;

    const deckIndex = type === 'chance' ? 0 : 1;
    const chosenCard = deck[deckIndex][deck[deckIndex].length - 1];
    setDeck((prev) => {
      const updatedDeck = [...prev];
      updatedDeck[deckIndex] = updatedDeck[deckIndex].slice(0, -1);
      return updatedDeck;
    });

    if (chosenCard.special) {
      console.log('picked special card:', chosenCard.special);
      setWinners((prev) => ({
        ...prev,
        [chosenCard.special === 'HOST' ? 'host' : 'quote']: currentPlayerName || '',
      }));
    }

    setSelectedCard(chosenCard);
    setPhase('revealed');
  };

  const skipPlayer = () => {
    if (phase !== 'picking') return;

    // check players length
    if (players.length === 0) {
      alert('SKIP PLAYER - no players left to skip');
      return;
    }

    if (removeCard()) {
      console.log('skip - before', players);
      const newPlayers = players.filter((p) => p !== players[currentPlayer!]);
      setPlayers(newPlayers);

      const randomPlayer = Math.floor(Math.random() * newPlayers.length);
      console.log('skip - after', newPlayers);
      console.log('SKIP PLAYER - new player:', randomPlayer, newPlayers[randomPlayer]);

      setCurrentPlayer(randomPlayer);
      // setPeople(people.filter((_, index) => index !== randomPerson));
      // setPhase('picking');
    } else {
      alert('SKIP PLAYER - no more good cards left');
    }
  };

  const removeCard = () => {
    let pile = deck[0].length > deck[1].length ? 0 : 1;

    for (let count = 0; count < 2; count++) {
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
      pile = ++pile % 2;
    }
    return false;
  };

  const dismissCard = () => {
    const newPlayers = players.filter((p) => p !== players[currentPlayer!]);
    setPlayers(newPlayers);
    setCurrentPlayer(null);
    setSelectedCard(null);
    if (newPlayers.length === 0) {
      setPhase('gameover');
    } else {
      setPhase('idle');
    }
  };

  return {
    startGame,
    rollDice,
    pickCard,
    dismissCard,
    skipPlayer,
    selectedCard,
    currentPlayerName,
    players,
    phase,
    deck,
    winners,
  };
}
