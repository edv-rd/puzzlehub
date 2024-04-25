import React from "react";
import { Game } from "./Game";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-top: 25%;
`;

export interface GameInfo {
  gameName: string;
  gameImage: string;
  gameUrl: string;
}

const games: GameInfo[] = [
  {
    gameName: "Wordle",
    gameImage: "wordle.png",
    gameUrl: "https://www.nytimes.com/games/wordle",
  },
  {
    gameName: "Connections",
    gameImage: "connections.png",
    gameUrl: "https://www.nytimes.com/games/connections",
  },
  {
    gameName: "GuessThe.Game",
    gameImage: "gtg.webp",
    gameUrl: "https://guessthe.game",
  },
  {
    gameName: "Framed",
    gameImage: "framed.png",
    gameUrl: "https://framed.wtf",
  },
];

export const GameList: React.FC = () => {
  return (
    <StyledWrapper>
      {games.map((game, index) => (
        <Game
          key={index}
          gameName={game.gameName}
          gameImage={game.gameImage}
          gameUrl={game.gameUrl}
        />
      ))}
    </StyledWrapper>
  );
};
