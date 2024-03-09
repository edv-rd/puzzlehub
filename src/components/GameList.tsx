import React from "react";
import { Game } from "./Game";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
