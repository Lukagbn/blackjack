import "./App.sass";
import { useEffect, useState } from "react";
import { getWinner, randomCard, winnerColor } from "./utils";

function App() {
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [overlay, setOverlay] = useState<boolean>(true);
  const [triggerTimer, setTriggerTimer] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const playerSum = playerCards.reduce((acc, curr) => acc + curr, 0);
  const dealerSum = dealerCards.reduce((acc, curr) => acc + curr, 0);

  function changeAce(cards: number[], cardSum: number) {
    if (cards.includes(11) && cardSum > 21) {
      const indexOfAce = cards.findIndex((num) => num === 11);

      setDealerCards((cards) =>
        cards.map((card, index) => (index === indexOfAce ? 1 : card)),
      );
    }
  }
  function startGame() {
    setTime(10);
    setOverlay(false);
    setWinner("");
    setDealerCards([randomCard()]);
    setPlayerCards([randomCard(), randomCard()]);
  }
  function restartGame() {
    setOverlay(true);
    setWinner("");
    setDealerCards([]);
    setPlayerCards([]);
  }

  function hitBtn() {
    if (playerSum !== 0 && playerSum > 21) {
      setTime(0);
      getWinner(playerSum, dealerSum);
      return;
    }
    setTime(10);
    setTriggerTimer((prev) => prev + 1);
    setPlayerCards((card) => [...card, randomCard()]);
  }
  function startBtn() {
    startGame();
    setTriggerTimer((prev) => prev + 1);
  }
  function standBtn() {
    setTime(0);
    getWinner(playerSum, dealerSum);
    setTriggerTimer((prev) => prev + 1);
  }
  function newGameBtn() {
    setTime(0);
    restartGame();
  }

  useEffect(() => {
    changeAce(dealerCards, dealerSum);
  }, [dealerCards]);

  useEffect(() => {
    if (time === 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (playerCards.length === 0 || dealerCards.length === 0) return;

    const timeOut = setTimeout(() => {
      const newDealerCards = [...dealerCards];
      let newDealerSum = dealerSum;

      while (
        playerSum <= 21 &&
        newDealerSum <= playerSum &&
        newDealerSum < 18
      ) {
        const newCard = randomCard();

        newDealerCards.push(newCard);
        newDealerSum += newCard;
      }

      setDealerCards(newDealerCards);
      setWinner(getWinner(playerSum, newDealerSum));
      setTime(0);
    }, time * 1000);

    return () => clearTimeout(timeOut);
  }, [triggerTimer]);

  useEffect(() => {
    if (playerSum >= 21) {
      setTime(0);
      setTriggerTimer((prev) => prev + 1);
    }
  }, [playerSum]);

  return (
    <main className="main">
      {overlay && (
        <div className="overlay">
          <button onClick={() => startBtn()}>start</button>
        </div>
      )}

      <section className="board">
        <img src="/dealer.png" alt="dealer" />
        <div>Dealer Cards: {dealerCards.map((card) => card + " ")}</div>
        <div>Dealer Sum: {dealerSum}</div>
        <p className="winner" style={{ color: winnerColor(winner) }}>
          {!overlay && winner}
        </p>
        <p>Time Left: {time}</p>
        <div>Your Cards: {playerCards.map((card) => card + " ")}</div>
        <div>Your Sum: {playerSum}</div>
        <div className="btnWrapper">
          <button
            disabled={playerSum > 21 || time === 0}
            onClick={() => hitBtn()}
          >
            hit
          </button>
          <button disabled={time === 0} onClick={() => standBtn()}>
            stand
          </button>
          <button onClick={() => newGameBtn()}>new game</button>
        </div>
      </section>
    </main>
  );
}

export default App;
