import { useEffect, useState } from "react";
import {
  StyledWrapper,
  StyledGameInfoSection,
  StyledButtonSection,
  StyledButton,
  StyledCheckmark,
} from "./styles/Game.styled";
import { GameResult } from "./DoneForToday";
import resultTrimmer from "../utils/resultTrimmer";
import { toast } from "react-toastify";
import React from "react";
import { getTodayDate } from "../utils/utils";

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
              result: `I finished today's Mini in ${time} seconds!`,
              playedDate: getTodayDate(),
            };

            saveResult(gameName, newResult);
            setIsFinished(true);
            navigator.clipboard.writeText("");
          }
        } else if (isValidResult(text) && !isFinished) {
          const normalizedText = text
            .replace(/\u00A0/g, " ")
            .replace(/\r\n/g, "\n")
            .trim();
          const trimmedResult = resultTrimmer({
            gameName,
            text: normalizedText,
          });

          const newResult: GameResult = {
            gameName: gameName,
            result: trimmedResult,
            playedDate: getTodayDate(),
          };

          saveResult(gameName, newResult);
          setIsFinished(true);
          navigator.clipboard.writeText("");
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

      const regexPattern = new RegExp(regex);

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
            <h2>{gameName} done 👍</h2>
          )}
        </StyledButton>
        {editMode && (
          <StyledCheckmark onClick={onToggleVisibility}>
            visible? {visible ? "✅" : "❌"}
          </StyledCheckmark>
        )}
      </StyledButtonSection>
    </StyledWrapper>
  );
};

function saveResult(gameName: string, newResult: GameResult) {
  const savedResults = JSON.parse(
    localStorage.getItem(`${gameName}Results`) || "[]"
  );
  savedResults.push(newResult);
  localStorage.setItem(`${gameName}Results`, JSON.stringify(savedResults));

  if (!toast.isActive("clipboard-toast")) {
    toast.success(`Saved result for ${gameName}!`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: "clipboard-toast",
    });
  }
}
