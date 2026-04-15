import './App.css';
import ChanceImage from './assets/chance.png';
import CommunityChestImage from './assets/community-chest.png';
import WozopolyImage from './assets/wozopoly.png';
import DiceImage from './assets/dice.png';

// import { useState } from 'react';
import { Deck } from './components/Deck';
import { Card } from './components/Card';
import { peopleList } from './data/people';
// import { deckOfCards } from './data/cards';
import { cards, specialCards } from './data/cards';

// import { useCards } from './hooks/useCards';
import { PlayerList } from './components/PlayerList';
import { useGameManager } from './hooks/useGameManager';

function App() {
  console.log('app');
  const {
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
  } = useGameManager();

  startGame(peopleList, [cards, specialCards]);

  if (phase === 'setup') {
    return <h1>setup</h1>;
  }

  return (
    <main>
      <PlayerList players={players} currentPlayerName={currentPlayerName} />
      <div className="board">
        <div className="header">
          <img src={WozopolyImage} alt="" />
        </div>
        <div className="dice">
          <button className="dice-btn" onClick={rollDice} disabled={phase !== 'idle'}>
            <img src={DiceImage} alt="Roll dice" />
          </button>
          <div className="flex">
            <h2>{currentPlayerName ? `${currentPlayerName}'s turn!` : <span>&nbsp;</span>}</h2>
            {currentPlayerName && (
              <button onClick={skipPlayer} disabled={phase !== 'picking'}>
                Not here?
              </button>
            )}
          </div>
        </div>
        <div className="cards">
          <Deck
            cardCount={deck[0].length}
            img={ChanceImage}
            disabled={phase !== 'picking' || deck[0].length === 0}
            onClick={() => {
              pickCard('chance');
            }}
          />
          <Deck
            cardCount={deck[1].length}
            img={CommunityChestImage}
            disabled={phase !== 'picking' || deck[1].length === 0}
            onClick={() => {
              pickCard('communityChest');
            }}
          />
        </div>
        <div className="debug-cards" style={{ textAlign: 'left' }}>
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
        {selectedCard && (
          <Card
            title={selectedCard.title}
            description={selectedCard.description}
            result={selectedCard.special}
            onClose={dismissCard}
          />
        )}
        {phase === 'gameover' && (
          <Card
            title="Congratulations!"
            description={`HOSTING: ${winners?.host}
            QUOTE: ${winners?.quote}`}
            onClose={() => {}}
          />
        )}
      </div>
    </main>
  );
}

export default App;
