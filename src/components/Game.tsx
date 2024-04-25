import { useEffect, useState } from "react";
import { GameInfo } from "./GameList";
import styled, { css } from "styled-components";

interface StyledWrapperProps {
  finished: boolean;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 10px 10px #000;
  width: 100%;

  img {
    object-fit: contain;
    height: 60px;
  }

  a {
    text-decoration: none;
  }

  ${(props) =>
    props.finished
      ? css``
      : css`
          &:hover {
            cursor: pointer;

            transform: translateX(2%) translateY(2%);
            transition: transform 0.25s ease-out;
            box-shadow: 10px 10px var(--background-color);
          }
        `}
`;

const StyledGameInfoSection = styled.div`
  width: 100%;
  background-color: var(--fourth-color);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  padding: 5px;

  a {
    color: var(--tertiary-color);
  }
`;

const StyledButtonSection = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  height: 60px;

  h2 {
    font-size: 18px;

    color: var(--tertiary-color);
  }

  a {
    font-size: 18px;
    color: var(--tertiary-color);
  }

  a:visited {
    color: var(--tertiary-color);
  }
`;

const StyledButton = styled.div`
  padding: 2px;
  margin: 5px;
  width: 50%;
  background-color: var(--secondary-color);

  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Game = ({ gameName, gameImage, gameUrl }: GameInfo) => {
  const [isFinished, setIsFinished] = useState(checkFinished(gameName));

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleGameClick = () => {
    savePlayedDate(gameName);
    setIsFinished(checkFinished(gameName));
    window.open(gameUrl, "_blank");
  };
  return (
    <StyledWrapper finished={isFinished} onClick={() => handleGameClick()}>
      <StyledGameInfoSection>
        <img src={`/${gameImage}`}></img>
      </StyledGameInfoSection>
      <StyledButtonSection>
        {!isFinished ? (
          <StyledButton>
            <a href="/">Play {gameName}!</a>
          </StyledButton>
        ) : (
          <h2>
            ⏰ New {gameName} in {countdown}...
          </h2>
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
