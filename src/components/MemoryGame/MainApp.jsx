import React, { useEffect, useState } from "react";
import "./MainApp.css";
import SingleCard from "../MemoryGame/SingleCard";

const cardImages = [
  { src: "/assets/helmet-1.png", matched: false },
  { src: "/assets/potion-1.png", matched: false },
  { src: "/assets/ring-1.png", matched: false },
  { src: "/assets/scroll-1.png", matched: false },
  { src: "/assets/shield-1.png", matched: false },
  { src: "/assets/sword-1.png", matched: false },
];
// console.log(cardImages);
const MainApp = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // const [isPending, setIsPending] = useState(false);
  // const [victory, setVictory] = useState('');

  const shuffleCards = () => {
    // setIsPending(true);
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    // setIsPending(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setCards(shuffled);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setTurns((prevTurn) => prevTurn + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    // setIsPending(true);
    shuffleCards();
    // setIsPending(false);
  }, []);

  // console.log(cards);

  // useEffect(() => {
  //   cards.forEach(card => {
  //     // console.log(card.matched === true);
  //     if(card.matched === true) {
  //       setVictory('You win!!!')
  //     } else {
  //       console.log('not gud')
  //     }
  //   })
  // });

  // useEffect(() => {
  //   cards.every(card => {
  //     if(card.matched === true) {
  //       console.log('winnnn')
  //     } else {
  //       console.log('no')
  //     }
  //   })
  // }, [])

  // console.log(win);
  //  console.log(victory);
  return (
    <>
      <div className="App-game">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="container">
          <div className="card-grid">
            {/* {isPending && <div>Loading..</div>} */}
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
        </div>

        <p>Your Turns: {turns}</p>
      </div>
    </>
  );
};

export default MainApp;
