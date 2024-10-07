import { useEffect, useState } from "react";
import { GameInfo } from "./GameList";
import {
  StyledWrapper,
  StyledGameInfoSection,
  StyledButtonSection,
  StyledButton,
  StyledResultInput,
} from "./styles/Game.styled";

export const Game = ({ gameName, gameImage, gameUrl }: GameInfo) => {
  const [isFinished, setIsFinished] = useState(checkFinished(gameName));
  const [countdown, setCountdown] = useState(calculateCountdown());
  const [showResultInput, setShowResultInput] = useState(false);
  const [result, setResult] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem(`${gameName}Result`);
    if (savedResult) {
      setResult(savedResult);
      setIsInputDisabled(true);
    }

    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
      setIsFinished(checkFinished(gameName));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameName]);

  const handleGameClick = () => {
    if (!isFinished) {
      savePlayedDate(gameName);
      setIsFinished(checkFinished(gameName));
      setShowResultInput(true);
      window.open(gameUrl, "_blank");
    }
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResult = e.target.value;
    setResult(newResult);
    if (isValidResult(newResult)) {
      localStorage.setItem(`${gameName}Result`, newResult);
      setIsInputDisabled(true);
    }
  };

  // Placeholder function for result validation
  const isValidResult = (input: string): boolean => {
    // TODO: Implement actual validation logic
    return true; // For now, assume all inputs are valid
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
        {isFinished && (
          <StyledResultInput
            type="text"
            placeholder="Paste your result here"
            value={!isInputDisabled ? result : "Result saved!"}
            onChange={handleResultChange}
            disabled={isInputDisabled}
          />
        )}
      </StyledButtonSection>
    </StyledWrapper>
  );
};

function checkFinished(gameName: string): boolean {
  const todaysDate = new Date().toLocaleDateString();
  const playedDate = localStorage.getItem(`${gameName}playedDate`);
  return todaysDate == playedDate;
}

function savePlayedDate(gameName: string) {
  const playedDate = new Date().toLocaleDateString();
  localStorage.setItem(`${gameName}playedDate`, playedDate);
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
