import "./App.sass";
import { useEffect, useState } from "react";

function App() {
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [overlay, setOverlay] = useState<boolean>(true);

  function randomCard(): number {
    const cardNumber = Math.floor(Math.random() * 13) + 1;
    if (cardNumber === 1) return 11;
    else if (cardNumber > 10) return 10;
    else return cardNumber;
  }

  function winningHand(): any {
    const playerSum = playerCards.reduce((acc, curr) => acc + curr, 0);
    const dealerSum = dealerCards.reduce((acc, curr) => acc + curr, 0);

    if (dealerSum > playerSum && dealerSum < 21) {
      setWinner("You Lost!");
    } else if (dealerSum > 21 && playerSum < dealerSum) {
      setWinner("You Won!");
    } else if (dealerSum === playerSum && playerSum <= 21) {
      setWinner("Draw!");
    } else if (dealerSum === 21) {
      setWinner("You Lost!");
    } else {
      setWinner("You Won!");
    }
  }

  function startGame(): any {
    setOverlay(false);
    setWinner("");
    setDealerCards([randomCard(), randomCard(), randomCard()]);
    setPlayerCards([randomCard(), randomCard(), randomCard()]);
  }

  function restartGame(): any {
    setOverlay(true);
    setWinner("");
    setDealerCards([]);
    setPlayerCards([]);
  }

  function winnerColor(winner: string): string {
    let color = "";
    switch (winner) {
      case "You Won!":
        color = "#9acb36";
        break;
      case "You Lost!":
        color = "red";
        break;
      case "Draw!":
        color = "grey";
        break;
    }
    return color;
  }

  function dealerDraw() {}

  useEffect(() => {
    const dealerSum = dealerCards.reduce((acc, curr) => acc + curr, 0);
    const playerSum = playerCards.reduce((acc, curr) => acc + curr, 0);

    if (dealerCards.includes(11) && dealerSum > 21) {
      const indexOfAce = dealerCards.findIndex((num) => num === 11);

      setDealerCards((cards) =>
        cards.map((card, index) => (index === indexOfAce ? 1 : card)),
      );
    }

    if (playerCards.includes(11) && playerSum > 21) {
      const indexOfAce = playerCards.findIndex((num) => num === 11);

      setPlayerCards((cards) =>
        cards.map((card, index) => (index === indexOfAce ? 1 : card)),
      );
    }
  }, [dealerCards, playerCards]);

  useEffect(() => {
    if (playerCards.length === 0 || dealerCards.length === 0) return;

    const timeOut = setTimeout(
      () => {
        dealerDraw();
        winningHand();
      },
      true ? 3000 : 0,
    );
    return () => clearTimeout(timeOut);
  }, [playerCards, dealerCards, winner]);

  return (
    <main className="main">
      {overlay && (
        <div className="overlay">
          <button onClick={() => startGame()}>start</button>
        </div>
      )}

      <section className="board">
        <img src="/dealer.png" alt="dealer" />
        <div>Dealer Cards: {dealerCards.map((card) => card + " ")}</div>
        <p className="winner" style={{ color: winnerColor(winner) }}>
          {!overlay && winner}
        </p>
        <div>Your Cards: {playerCards.map((card) => card + " ")}</div>
        <div className="btnWrapper">
          <button>hit</button>
          <button>stand</button>
          <button onClick={() => restartGame()}>new game</button>
        </div>
      </section>
    </main>
  );
}

export default App;
