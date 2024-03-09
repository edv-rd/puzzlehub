import React from "react";
import { GameInfo } from "./GameList";
import styled, { css } from "styled-components";

interface StyledWrapperProps {
  finished: boolean;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  padding: 5px;

  border-radius: 15px;

  h1 {
    font-size: 15px;
  }

  a {
    text-decoration: none;
  }

  img {
    height: 60px;
  }
  ${(props) =>
    props.finished
      ? css`
          border: 1px solid gray;
        `
      : css`
          border: 1px solid red;
        `}
`;

export const Game = ({ gameName, gameImage, gameUrl }: GameInfo) => {
  const [isFinished, setIsFinished] = React.useState(checkFinished(gameName));

  const handleGameClick = () => {
    savePlayedDate(gameName);
    setIsFinished(checkFinished(gameName));
    window.open(gameUrl, "_blank");
  };
  return (
    <StyledWrapper finished={isFinished}>
      <img src={`/${gameImage}`}></img>
      <h1>
        <a href={gameUrl}>{gameName}</a>
        {!isFinished && (
          <button onClick={() => handleGameClick()}>Play!</button>
        )}
      </h1>
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
