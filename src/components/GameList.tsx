import React from "react";
import { Game } from "./Game";
import { DoneForToday } from "./DoneForToday";
import styled from "styled-components";
import gameData from "../games.json";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledGameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-top: 25%;
  @media (max-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;

export interface GameInfo {
  gameName: string;
  gameImage: string;
  gameUrl: string;
  visible: boolean;
  regex: string;
}

export const GameList: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledGameGrid>
        {gameData
          .filter((game: GameInfo) => game.visible)
          .map((game: GameInfo, index: number) => (
            <Game
              key={index}
              gameName={game.gameName}
              gameImage={game.gameImage}
              gameUrl={game.gameUrl}
              visible={game.visible}
              regex={game.regex}
            />
          ))}
      </StyledGameGrid>
      <DoneForToday />
    </StyledWrapper>
  );
};
