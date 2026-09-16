import { useEffect, useState } from "react";

function App() {
  const [winner, setWinner] = useState<string>(" ");
  const [userCards, setUserCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [timesUp, setTimesUp] = useState<boolean>(true);

  function randomCardNumber() {
    let number = Math.floor(Math.random() * 13) + 1;
    if (number === 1) return (number = 11);
    else if (number > 10) return (number = 10);
    else return number;
  }

  useEffect(() => {
    const userSum = userCards.reduce((acc, curr) => acc + curr, 0);
    const dealerSum = dealerCards.reduce((acc, curr) => acc + curr, 0);

    if (userSum > 21) {
      setWinner("You Lost!");
    } else if (dealerSum > 21) {
      setWinner("You Won!");
    } else if (userSum === 21) {
      setWinner("You Won!");
    } else if (dealerSum === 21) {
      setWinner("You Lost!");
    } else if (dealerSum > 18) {
      if (userSum > dealerSum) {
        setWinner("You Won!");
      } else if (userSum === dealerSum) {
        setWinner("Draw!");
      } else {
        setWinner("You Lost!");
      }
    } else {
      setWinner(" ");
    }
  }, [userCards, dealerCards]);

  function startNewGame() {
    setUserCards([]);
    setDealerCards([]);
    setWinner(" ");
    setTimesUp(true);
  }

  useEffect(() => {
    const dealerSum = dealerCards.reduce((acc, curr) => acc + curr, 0);
    const usersSum = userCards.reduce((acc, curr) => acc + curr, 0);

    if (usersSum === 21) return;
    if (dealerSum > 18 || userCards.length === 0) return;

    const timeout = setTimeout(() => {
      if (dealerSum > usersSum) return;
      setDealerCards((prev) => [...prev, randomCardNumber()]);
      setTimesUp(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dealerCards, userCards]);

  return (
    <div>
      <img src="/dealer.png" alt="dealer" />
      <div>Dealer Cards: {dealerCards.map((card) => card + " ")}</div>
      <p>{winner}</p>
      <div>Your Cards: {userCards.map((card) => card + " ")}</div>
      <button
        onClick={() => {
          if (timesUp) {
            let sum = userCards.reduce((acc, curr) => acc + curr, 0);
            if (sum > 21 || sum === 21) return;
            setUserCards((prev) => [...prev, randomCardNumber()]);
          } else return;
        }}
      >
        Draw new card
      </button>
      <button
        onClick={() => {
          startNewGame();
        }}
      >
        Start new game
      </button>
    </div>
  );
}

export default App;
