import React, { useState } from "react";
import { Game } from "./Game";
import { DoneForToday } from "./DoneForToday";
import styled from "styled-components";
import gameData from "../games.json";
import TopBar from "./TopBar";

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
  regex: string;
}

export const GameList: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <TopBar editMode={editMode} setEditMode={setEditMode} />
      <StyledWrapper>
        <StyledGameGrid>
          {gameData.map((game: GameInfo, index: number) => (
            <Game
              key={index}
              gameName={game.gameName}
              gameImage={game.gameImage}
              gameUrl={game.gameUrl}
              regex={game.regex}
            />
          ))}
        </StyledGameGrid>
        <DoneForToday />
      </StyledWrapper>
    </>
  );
};
