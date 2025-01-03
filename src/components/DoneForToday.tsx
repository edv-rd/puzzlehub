import React from "react";
import styled from "styled-components";
import gameData from "../games.json";
import { toast } from "react-toastify";

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

export interface GameResult {
  gameName: string;
  result: string;
  playedDate: string;
}

export const DoneForToday: React.FC = () => {
  const handleDoneClick = () => {
    const localUserName = localStorage.getItem("localUserName");
    const todayDate = new Date().toISOString().split("T")[0];
    let combinedResult = `PuzzleHub for ${localUserName} ${todayDate}\n\n---\n\n`;

    gameData.forEach((game) => {
      const results: GameResult[] = JSON.parse(
        localStorage.getItem(`${game.gameName}Results`) || "[]"
      );
      const todayResult = results.find((r) => r.playedDate === todayDate);
      if (todayResult) {
        combinedResult += `${todayResult.result}\n\n---\n\n`;
      }
    });

    if (combinedResult) {
      const randomEmojis = ["👍", "🙊", "😀", "💪", "😈", "💗"];
      const randomEmoji =
        randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

      combinedResult =
        combinedResult +
        `http://puzzlehub.edvardshemsida.se - Made by Ed ${randomEmoji}`;
      navigator.clipboard.writeText(combinedResult.trim());
      toast.success("Results updated!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("No results found!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <StyledButton onClick={handleDoneClick}>Done for today</StyledButton>
      <StyledButton onClick={handleDoneClick}>
        Just want to see the results...
      </StyledButton>
    </>
  );
};
