import React, { useEffect, useState } from "react";
import { Game } from "./Game";
import { DoneForToday } from "./DoneForToday";
import styled from "styled-components";
import gameData from "../games.json";
import TopBar from "./TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  margin-top: 5%;
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
  visible: boolean;
}

export const GameList: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <TopBar editMode={editMode} setEditMode={setEditMode} />
      <StyledWrapper>
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
        <DoneForToday />
      </StyledWrapper>
    </>
  );
};
