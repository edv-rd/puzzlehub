import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

export const DoneForToday: React.FC = () => {
  const handleDoneClick = () => {
    const games = ["Wordle", "Connections", "GuessThe.Game", "Framed"];
    let combinedResult = "";

    games.forEach((game) => {
      const result = localStorage.getItem(`${game}Result`);
      if (result) {
        combinedResult += `${game}:\n${result}\n\n`;
      }
    });

    if (combinedResult) {
      navigator.clipboard.writeText(combinedResult.trim());
      alert("Combined results copied to clipboard!");
    } else {
      alert("No results found for today's games.");
    }
  };

  return <StyledButton onClick={handleDoneClick}>Done for today</StyledButton>;
};
