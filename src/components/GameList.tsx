import React, { useEffect, useState } from "react";
import { Game } from "./Game";

import styled from "styled-components";
import gameData from "../games.json";

import "react-toastify/dist/ReactToastify.css";
import { DoneForToday } from "./DoneForToday";
import { GameInfo } from "./GameView";

const StyledGameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-top: 5%;
  @media (max-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;

interface GameListProps {
  editMode: boolean;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

export const GameList: React.FC<GameListProps> = ({
  editMode,
  setViewMode,
}) => {
  const [games, setGames] = useState<GameInfo[]>([]);

  useEffect(() => {
    const storedGames = localStorage.getItem("gameVisibility");
    if (storedGames) {
      setGames(JSON.parse(storedGames));
    } else {
      const initialGames = gameData.map((game) => ({ ...game, visible: true }));
      setGames(initialGames);
    }
  }, []);

  const saveToLocalStorage = (updatedGames: GameInfo[]) => {
    localStorage.setItem("gameVisibility", JSON.stringify(updatedGames));
  };

  const toggleVisibility = (index: number) => {
    const updatedGames = [...games];
    updatedGames[index].visible = !updatedGames[index].visible;
    setGames(updatedGames);
    saveToLocalStorage(updatedGames);
  };
  return (
    <>
      <StyledGameGrid>
        {games.map((game: GameInfo, index: number) => (
          <Game
            key={index}
            gameName={game.gameName}
            gameImage={game.gameImage}
            gameUrl={game.gameUrl}
            regex={game.regex}
            visible={game.visible}
            editMode={editMode}
            onToggleVisibility={() => toggleVisibility(index)}
          />
        ))}
      </StyledGameGrid>

      <DoneForToday setViewMode={setViewMode} />
    </>
  );
};
