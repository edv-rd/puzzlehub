import React from "react";
import { StyledButton } from "./styles/Button.styled";
import gameData from "../games.json";
import { toast } from "react-toastify";

export interface GameResult {
  gameName: string;
  result: string;
  playedDate: string;
}

interface DoneForTodayProps {
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

export const DoneForToday: React.FC<DoneForTodayProps> = ({ setViewMode }) => {
  const handleDoneClick = () => {
    const todayDate = new Date().toISOString().split("T")[0];
    let combinedResult = `PuzzleHub for ${todayDate}\n\n---\n\n`;

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
      <StyledButton onClick={() => setViewMode("toplists")}>
        Just want to see the results...
      </StyledButton>
    </>
  );
};
