export function randomCard(): number {
  const cardNumber = Math.floor(Math.random() * 13) + 1;
  if (cardNumber === 1) return 11;
  if (cardNumber > 10) return 10;
  return cardNumber;
}

export function getWinner(playerSum: number, dealerSum: number): string {
  if (playerSum > 21) return "You Lost!";
  if (dealerSum > 21) return "You Won!";
  if (playerSum === 21 && dealerSum === 21) return "Draw!";
  if (playerSum === 21) return "You Won!";
  if (dealerSum === 21) return "You Lost!";
  if (playerSum > dealerSum) return "You Won!";
  if (playerSum < dealerSum) return "You Lost!";
  return "Draw!";
}

export function winnerColor(winner: string): string {
  switch (winner) {
    case "You Won!":
      return "#9acb36";
    case "You Lost!":
      return "red";
    case "Draw!":
      return "grey";
    default:
      return "";
  }
}
