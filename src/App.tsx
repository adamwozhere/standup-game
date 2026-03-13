import './App.css';
import ChanceImage from './assets/chance.png';
import CommunityChestImage from './assets/community-chest.png';
import WozopolyImage from './assets/wozopoly.png';
import DiceImage from './assets/dice.png';

import { useState } from 'react';
import { Deck } from './components/Deck';
import { Card } from './components/Card';
import { cards, specialCards } from './data/cards';
import { peopleList } from './data/people';
import { useCards } from './hooks/useCards';

function App() {
  const [person, setPerson] = useState<string | null>(null);
  const [people, setPeople] = useState(peopleList);
  const [isPlaying, setIsPlaying] = useState(false);

  const { drawCard, currentCard, setCurrentCard, removeCard, deck } = useCards(
    peopleList.length,
    cards,
    specialCards
  );

  const rollDice = () => {
    if (isPlaying) return;

    const randomPerson = Math.floor(Math.random() * people.length);
    setPerson(people[randomPerson]);
    setPeople(people.filter((_, index) => index !== randomPerson));
    setIsPlaying(true);
    console.log(people);
  };

  const skipPerson = () => {
    if (!isPlaying) return;
    if (people.length === 0) {
      alert('SKIP PERSON - No more people left to skip!');
      return;
    }

    if (removeCard()) {
      setPeople(people.filter((p) => p !== person));

      const randomPerson = Math.floor(Math.random() * people.length);
      setPerson(people[randomPerson]);
      setPeople(people.filter((_, index) => index !== randomPerson));
      setIsPlaying(true);
      console.log(people);
    } else {
      alert('SKIP PERSON - no more good cards');
      console.log('no good cards left 2: ', deck);
    }
  };

  const pickCard = (type: 'chance' | 'community-chest') => {
    setIsPlaying(true);
    drawCard(type);
  };

  return (
    <>
      <div className="header">
        <img src={WozopolyImage} alt="" />
      </div>
      <div className="center">
        <button className="dice-btn" onClick={rollDice} disabled={isPlaying}>
          <img src={DiceImage} alt="Roll dice" />
        </button>
        <div className="flex">
          <h2>{person ? `${person}'s turn!` : <span>&nbsp;</span>}</h2>
          {person && (
            <button onClick={skipPerson} disabled={!isPlaying}>
              Not here?
            </button>
          )}
        </div>
        <div>
          <ul>
            {people.map((person) => (
              <li key={person}>{person}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="cards">
        <Deck
          cardCount={deck[0].length}
          img={ChanceImage}
          disabled={!isPlaying}
          onClick={() => {
            if (!isPlaying) return;
            pickCard('chance');
          }}
        />
        <Deck
          cardCount={deck[1].length}
          img={CommunityChestImage}
          disabled={!isPlaying}
          onClick={() => {
            if (!isPlaying) return;
            pickCard('community-chest');
          }}
        />
      </div>
      <div className="cards" style={{ textAlign: 'left' }}>
        <div>
          <ul>
            {deck[0].map((card) => (
              <li key={card.title}>{card.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {deck[1].map((card) => (
              <li key={card.title}>{card.title}</li>
            ))}
          </ul>
        </div>
      </div>
      {currentCard && isPlaying && (
        <Card
          title={currentCard.title}
          description={currentCard.description}
          result={currentCard.special}
          onClose={() => {
            setIsPlaying(false);
            setCurrentCard(null);
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
