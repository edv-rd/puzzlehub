import { useEffect, useState } from "react";
import {
  StyledWrapper,
  StyledGameInfoSection,
  StyledButtonSection,
  StyledButton,
  StyledCheckmark,
} from "./styles/Game.styled";
import { GameResult } from "./DoneForToday";

interface GameProps {
  gameName: string;
  gameImage: string;
  gameUrl: string;
  regex: string;
  visible: boolean;
  editMode: boolean;
  onToggleVisibility: () => void;
}

export const Game: React.FC<GameProps> = ({
  gameName,
  gameImage,
  gameUrl,
  visible,
  editMode,
  regex,
  onToggleVisibility,
}) => {
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

    const checkClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();

        if (gameName === "The Mini Crossword" && isValidResult(text)) {
          const timeMatch = text.match(/[?&]t=(\d+)/);
          if (timeMatch) {
            const time = timeMatch[1];
            const newResult: GameResult = {
              gameName: gameName,
              result: `I finished today's Mini in ${time} seconds`,
              playedDate: getTodayDate(),
            };

            saveResult(gameName, newResult);
            setIsFinished(true);
          }
        } else if (isValidResult(text) && !isFinished) {
          // Default case for other games
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
    const isValidResult = (input: string): boolean => {
      const normalizedInput = input
        .replace(/\u00A0/g, " ")
        .replace(/\r\n/g, "\n")
        .trim();
      console.log("Normalized Input:", normalizedInput);
      const regexPattern = new RegExp(regex, "m");
      console.log(regexPattern);
      console.log("Match Result:", regexPattern.test(normalizedInput));
      return regexPattern.test(normalizedInput);
    };

    return () => clearInterval(intervalId);
  }, [gameName]);

  const handleGameClick = () => {
    if (!isFinished && !editMode) {
      window.open(gameUrl, "_blank");
    }
  };

  return (
    <StyledWrapper
      editMode={editMode}
      finished={isFinished}
      visible={visible}
      onClick={handleGameClick}
    >
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
        {editMode && (
          <StyledCheckmark onClick={onToggleVisibility}>
            {visible ? "✅" : "❌"}
          </StyledCheckmark>
        )}
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
