import './App.css';
import ChanceImage from './assets/chance.png';
import CommunityChestImage from './assets/community-chest.png';
import WozopolyImage from './assets/wozopoly.png';
import DiceImage from './assets/dice.png';

import { useState } from 'react';
import { Card } from './components/Card';
import { ResultCard } from './components/ResultCard';
import { buildDeck } from './utils/shuffle';
import { cards, specialCards } from './data/cards';
import { peopleList } from './data/people';

type Result = {
  title: string;
  description: string;
  result?: string;
};

function App() {
  const [person, setPerson] = useState<string | null>(null);
  const [people, setPeople] = useState(peopleList);
  const [result, setResult] = useState<Result | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deck, setDeck] = useState<Result[]>(() =>
    buildDeck(peopleList.length, cards, specialCards),
  );

  const rollDice = () => {
    if (isPlaying) return;

    const randomPerson = Math.floor(Math.random() * people.length);
    setPerson(people[randomPerson]);
    setPeople(people.filter((_, index) => index !== randomPerson));
    setIsPlaying(true);
    console.log(people);
  };

  // note: not splitting deck yet.
  const pickCard = (_card: 'chance' | 'community-chest') => {
    const chosenCard = deck[deck.length - 1];
    if (!chosenCard) {
      alert('PICK CARD - No more cards left!');
      return;
    }

    setResult(chosenCard);
    setDeck((prev) => prev.slice(0, -1));
    console.log('Remaining deck:', deck);
  };

  const skipPerson = () => {
    if (!isPlaying) return;
    if (people.length === 0) {
      alert('SKIP PERSON - No more people left to skip!');
      return;
    }

    setPeople(people.filter((p) => p !== person));

    const randomPerson = Math.floor(Math.random() * people.length);
    setPerson(people[randomPerson]);
    setPeople(people.filter((_, index) => index !== randomPerson));
    setIsPlaying(true);
    console.log(people);
    // remove a "good" card
    setDeck((prev) => {
      // random index card
      let randomIndex = Math.floor(Math.random() * prev.length);

      // if only 2 cards left, check if we can remove a "good" card
      if (prev.length === 2) {
        // if both cards are "bad" then we can't skip
        if (
          prev.every(
            (card) => card.result === 'HOST' || card.result === 'QUOTE',
          )
        ) {
          return prev;
        }
      }

      while (
        prev[randomIndex].result === 'HOST' ||
        prev[randomIndex].result === 'QUOTE'
      ) {
        randomIndex = Math.floor(Math.random() * prev.length);
      }
      return prev.filter((_, index) => index !== randomIndex);
    });
  };

  return (
    <>
      <div className='header'>
        <img src={WozopolyImage} alt='' />
      </div>
      <div className='center'>
        <button className='dice-btn' onClick={rollDice} disabled={isPlaying}>
          <img src={DiceImage} alt='Roll dice' />
        </button>
        <div className='flex'>
          <h2>{person ? `${person}'s turn!` : <span>&nbsp;</span>}</h2>
          {person && (
            <button onClick={skipPerson} disabled={!isPlaying}>
              Not here?
            </button>
          )}
        </div>
      </div>
      <div className='cards'>
        <Card
          img={ChanceImage}
          disabled={!isPlaying}
          onClick={() => {
            if (!isPlaying) return;
            pickCard('chance');
          }}
        />
        <Card
          img={CommunityChestImage}
          disabled={!isPlaying}
          onClick={() => {
            if (!isPlaying) return;
            pickCard('community-chest');
          }}
        />
      </div>
      {result && (
        <ResultCard
          title={result.title}
          description={result.description}
          result={result.result}
          onClose={() => {
            setResult(null);
            setIsPlaying(false);
            if (people.length === 0) {
              alert('RESULT CARD - No more people left to play!');
            }
          }}
        />
      )}
    </>
  );
}

export default App;
