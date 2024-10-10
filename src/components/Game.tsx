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
    }, 1000);

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
      </StyledButtonSection>
      {editMode && (
        <StyledCheckmark onClick={onToggleVisibility}>
          {visible ? "✅" : "❌"}
        </StyledCheckmark>
      )}
    </StyledWrapper>
  );
};

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
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
