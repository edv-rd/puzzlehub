import { StyledButton } from "./styles/Button.styled";
import gameData from "../games.json";
import TopList from "./TopList";

import { TopListsGrid } from "./styles/TopList.styled";

interface TopListsProps {
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

const TopLists: React.FC<TopListsProps> = ({ setViewMode }) => {
  return (
    <>
      <TopListsGrid>
        {gameData.map((game, index: number) => (
          <TopList key={index} gameName={game.gameName} date={""} />
        ))}
      </TopListsGrid>
      <StyledButton onClick={() => setViewMode("gamelist")}>
        Back to games
      </StyledButton>
    </>
  );
};

export default TopLists;
