import { useState } from "react";
import { GameInfo } from "./GameList";
import styled, { css } from "styled-components";

interface StyledWrapperProps {
  finished: boolean;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 10px 10px #000000;

  img {
    object-fit: contain;
    height: 60px;
  }

  a {
    text-decoration: none;
  }

  ${(props) => (props.finished ? css`` : css``)}
`;

const StyledGameInfoSection = styled.div`
  width: 100%;
  background-color: #f8f4e3;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledButtonSection = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: #8884ff;
`;

export const Game = ({ gameName, gameImage, gameUrl }: GameInfo) => {
  const [isFinished, setIsFinished] = useState(checkFinished(gameName));

  const handleGameClick = () => {
    savePlayedDate(gameName);
    setIsFinished(checkFinished(gameName));
    window.open(gameUrl, "_blank");
  };
  return (
    <StyledWrapper finished={isFinished}>
      <StyledGameInfoSection>
        <img src={`/${gameImage}`}></img>
        <h1>
          <a href={gameUrl}>{gameName}</a>
        </h1>
      </StyledGameInfoSection>
      <StyledButtonSection>
        {!isFinished ? (
          <button onClick={() => handleGameClick()}>Play!</button>
        ) : (
          <h2>"Countdown to new game..."</h2>
        )}
      </StyledButtonSection>
    </StyledWrapper>
  );
};

function checkFinished(gameName: string): boolean {
  const todaysDate = new Date().toLocaleDateString();
  const playedDate = localStorage.getItem(`${gameName}playedDate`);
  if (!playedDate || todaysDate !== playedDate) {
    return false;
  }
  return true;
}

function savePlayedDate(gameName: string) {
  const playedDate = new Date().toLocaleDateString();
  localStorage.setItem(`${gameName}playedDate`, playedDate);
}
