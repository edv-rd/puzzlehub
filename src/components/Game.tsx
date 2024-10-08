import { useEffect, useState } from "react";
import { GameInfo } from "./GameList";
import {
  StyledWrapper,
  StyledGameInfoSection,
  StyledButtonSection,
  StyledButton,
} from "./styles/Game.styled";

interface GameResult {
  gameName: string;
  result: string;
  playedDate: string;
}

export const Game = ({ gameName, gameImage, gameUrl }: GameInfo) => {
  const [isFinished, setIsFinished] = useState(false);
  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const savedResults = JSON.parse(
      localStorage.getItem(`${gameName}Results`) || "[]"
    );
    const todayResult = savedResults.find(
      (r: GameResult) => r.playedDate === getTodayDate()
    );
    if (todayResult) {
      setIsFinished(true);
    }

    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
      checkClipboard();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameName]);

  const handleGameClick = () => {
    if (!isFinished) {
      window.open(gameUrl, "_blank");
    }
  };

  const checkClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();

      // Compare strings character by character

      if (isValidResult(text, gameName) && !isFinished) {
        const newResult: GameResult = {
          gameName: gameName,
          result: text,
          playedDate: getTodayDate(),
        };

        saveResult(gameName, newResult);
        setIsFinished(true);
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  // Placeholder function for result validation
  const isValidResult = (input: string, game: string): boolean => {
    switch (game) {
      case "Wordle": {
        const normalizedInput = input
          .replace(/\u00A0/g, " ")
          .replace(/\r\n/g, "\n")
          .replace(/\s+/g, " ")
          .trim();
        console.log("Normalized Input:", normalizedInput);
        const regex = /^Wordle\s\d{1,4}\s\d{1,3}\s\d{1}\/6/m;
        console.log("Match Result:", regex.test(normalizedInput));

        return regex.test(normalizedInput);
      }
      case "Connections": {
        const normalizedInput = input
          .replace(/\u00A0/g, " ")
          .replace(/\r\n/g, "\n")
          .trim();
        console.log("Normalized Input:", normalizedInput);
        const regex = /^Connections\s*\nPuzzle\s+#\d+/m;
        console.log("Match Result:", regex.test(normalizedInput));

        return regex.test(normalizedInput);
      }

      case "GuessThe.Game": {
        const normalizedInput = input
          .replace(/\u00A0/g, " ")
          .replace(/\r\n/g, "\n")
          .replace(/\s+/g, " ") // Normalize to a single space
          .trim();

        console.log("Normalized Input:", normalizedInput);
        const regex = /^#GuessTheGame\s+#\d+/m;
        console.log("Match Result:", regex.test(normalizedInput));

        return regex.test(normalizedInput);
      }
      case "Framed": {
        const normalizedInput = input
          .replace(/\u00A0/g, " ")
          .replace(/\r\n/g, "\n")
          .replace(/\s+/g, " ") // Normalize to a single space
          .trim();

        console.log("Normalized Input:", normalizedInput);
        const regex = /^Framed\s+#\d+/m;
        console.log("Match Result:", regex.test(normalizedInput));

        return regex.test(normalizedInput);
      }

      default:
        return false;
    }
  };

  return (
    <StyledWrapper finished={isFinished} onClick={handleGameClick}>
      <StyledGameInfoSection>
        <img src={`/${gameImage}`} alt={gameName} />
      </StyledGameInfoSection>
      <StyledButtonSection>
        <StyledButton>
          {!isFinished ? (
            <h2>Play {gameName}!</h2>
          ) : (
            <h2>
              ⏰ New {gameName} in {countdown}...
            </h2>
          )}
        </StyledButton>
        {isFinished && <p>Result saved!</p>}
      </StyledButtonSection>
    </StyledWrapper>
  );
};

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function saveResult(gameName: string, newResult: GameResult) {
  const savedResults = JSON.parse(
    localStorage.getItem(`${gameName}Results`) || "[]"
  );
  savedResults.push(newResult);
  localStorage.setItem(`${gameName}Results`, JSON.stringify(savedResults));
}

function calculateCountdown(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
