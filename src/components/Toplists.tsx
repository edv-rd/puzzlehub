import { StyledButton } from "./styles/Button.styled";
import gameData from "../games.json";
import TopList from "./TopList";

interface TopListsProps {
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

const TopLists: React.FC<TopListsProps> = ({ setViewMode }) => {
  return (
    <>
      {gameData.map((game, index: number) => (
        <TopList key={index} gameName={game.gameName} date={""} />
      ))}
      <StyledButton onClick={() => setViewMode("gamelist")}>
        Back to games
      </StyledButton>
    </>
  );
};

export default TopLists;
